// Camada de nuvem do Painel CAD: login, Firestore e sincronização.
// O app.js continua usando localStorage; este arquivo espelha os dados no Firebase.
// Esta versão NÃO recarrega a página sozinha.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv7i-i3S_f70ur5WBU7JLQwEU1u_rDmrg",
  authDomain: "cad-painel-oab.firebaseapp.com",
  projectId: "cad-painel-oab",
  storageBucket: "cad-painel-oab.firebasestorage.app",
  messagingSenderId: "362985739736",
  appId: "1:362985739736:web:0cebd447f70c211b6fcead"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const REF_TROCAS = () => doc(db, "trocas", "lista");
const REF_NOTAS = () => doc(db, "notas", "pessoal");

const setItemOriginal = Storage.prototype.setItem;
let sincronizado = false;

// Toda gravação do app.js no localStorage também vai para a nuvem,
// depois que o login e a sincronização inicial terminarem.
Storage.prototype.setItem = function (chave, valor) {
  setItemOriginal.call(this, chave, valor);

  if (this === localStorage && sincronizado) {
    enviarParaNuvem(chave, valor);
  }
};

// Ordena os campos de todos os objetos, para que a comparação ignore a ordem.
function ordenar(valor) {
  if (Array.isArray(valor)) return valor.map(ordenar);

  if (valor && typeof valor === "object") {
    return Object.keys(valor).sort().reduce((obj, chave) => {
      obj[chave] = ordenar(valor[chave]);
      return obj;
    }, {});
  }

  return valor;
}

function canonico(valor) {
  return JSON.stringify(ordenar(valor));
}

function erroNuvem(e) {
  console.error(e);
  alert("Não foi possível salvar na nuvem. Verifique a conexão e tente novamente.");
}

function enviarParaNuvem(chave, valor) {
  let dados;

  try {
    dados = JSON.parse(valor);
  } catch {
    return;
  }

  if (chave === "trocas") {
    setDoc(REF_TROCAS(), { itens: dados }).catch(erroNuvem);
  } else if (chave === "cad-notes-v2") {
    setDoc(REF_NOTAS(), { texto: dados }).catch(erroNuvem);
  }
}

function lerLocal(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave));
  } catch {
    return null;
  }
}

// Compara a nuvem com este navegador.
// Se a nuvem estiver vazia e houver dados locais, envia os dados locais.
// Se a nuvem tiver dados diferentes, eles passam a valer neste navegador.
async function sincronizar() {
  const [snapTrocas, snapNotas] = await Promise.all([
    getDoc(REF_TROCAS()),
    getDoc(REF_NOTAS())
  ]);

  let mudou = false;

  const localTrocas = lerLocal("trocas") ?? [];

  if (snapTrocas.exists()) {
    const nuvem = snapTrocas.data().itens ?? [];

    if (canonico(nuvem) !== canonico(localTrocas)) {
      setItemOriginal.call(localStorage, "trocas", JSON.stringify(nuvem));
      mudou = true;
    }
  } else if (localTrocas.length > 0) {
    await setDoc(REF_TROCAS(), { itens: localTrocas });
  }

  const localNotas = lerLocal("cad-notes-v2") ?? "";

  if (snapNotas.exists()) {
    const nuvem = snapNotas.data().texto ?? "";

    if (canonico(nuvem) !== canonico(localNotas)) {
      setItemOriginal.call(localStorage, "cad-notes-v2", JSON.stringify(nuvem));
      mudou = true;
    }
  } else if (localNotas !== "") {
    await setDoc(REF_NOTAS(), { texto: localNotas });
  }

  return mudou;
}

function criarInterface() {
  const estilo = document.createElement("style");

  estilo.textContent = `
    #nuvem-login {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 20px;
      background: #f4f7fb;
      font-family: Arial, sans-serif;
    }
    #nuvem-login[hidden] { display: none; }
    #nuvem-login .caixa {
      width: 100%;
      max-width: 340px;
      background: #fff;
      border: 1px solid #bdcee2;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 12px 30px #003b7126;
    }
    #nuvem-login h2 { margin: 0 0 6px; color: #102d4e; font-size: 20px; }
    #nuvem-login p { margin: 0 0 16px; color: #62768c; font-size: 13px; }
    #nuvem-login label { display: block; margin-bottom: 6px; color: #102d4e; font-size: 13px; }
    #nuvem-login input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      margin-bottom: 14px;
      border: 1px solid #bdcee2;
      border-radius: 9px;
      font-size: 15px;
    }
    #nuvem-login button {
      width: 100%;
      padding: 12px;
      border: 0;
      border-radius: 9px;
      background: #003b71;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    #nuvem-login button:disabled { opacity: 0.6; cursor: wait; }
    #nuvem-login .erro { min-height: 18px; margin-top: 12px; color: #b42318; font-size: 13px; }
    #nuvem-sair {
      position: fixed;
      right: 14px;
      bottom: 14px;
      z-index: 900;
      padding: 9px 14px;
      border: 1px solid #bdcee2;
      border-radius: 9px;
      background: #fff;
      color: #102d4e;
      font-size: 13px;
      cursor: pointer;
    }
    #nuvem-sair[hidden] { display: none; }
    #nuvem-aviso {
      position: fixed;
      left: 14px;
      bottom: 14px;
      right: 120px;
      z-index: 900;
      padding: 10px 12px;
      border-radius: 9px;
      background: #102d4e;
      color: #fff;
      font-size: 13px;
    }
    #nuvem-aviso[hidden] { display: none; }
  `;
  document.head.append(estilo);

  const tela = document.createElement("div");
  tela.id = "nuvem-login";
  tela.hidden = true;
  tela.innerHTML = `
    <div class="caixa">
      <h2>Entrar no Painel CAD</h2>
      <p>Acesso restrito. Use o e-mail e a senha da sua conta.</p>
      <label for="nuvem-email">E-mail</label>
      <input id="nuvem-email" type="email" autocomplete="username" placeholder="seu e-mail">
      <label for="nuvem-senha">Senha</label>
      <input id="nuvem-senha" type="password" autocomplete="current-password" placeholder="sua senha">
      <button id="nuvem-entrar" type="button">Entrar</button>
      <div class="erro" id="nuvem-erro" role="status"></div>
    </div>
  `;

  const sair = document.createElement("button");
  sair.id = "nuvem-sair";
  sair.type = "button";
  sair.textContent = "Sair";
  sair.hidden = true;

  const aviso = document.createElement("div");
  aviso.id = "nuvem-aviso";
  aviso.hidden = true;

  document.body.append(tela, sair, aviso);

  const email = tela.querySelector("#nuvem-email");
  const senha = tela.querySelector("#nuvem-senha");
  const botao = tela.querySelector("#nuvem-entrar");
  const erro = tela.querySelector("#nuvem-erro");

  async function entrar() {
    erro.textContent = "";

    if (!email.value.trim() || !senha.value) {
      erro.textContent = "Informe e-mail e senha.";
      return;
    }

    botao.disabled = true;

    try {
      await signInWithEmailAndPassword(auth, email.value.trim(), senha.value);
    } catch {
      erro.textContent = "E-mail ou senha incorretos.";
    } finally {
      botao.disabled = false;
    }
  }

  botao.onclick = entrar;

  senha.addEventListener("keydown", e => {
    if (e.key === "Enter") entrar();
  });

  sair.onclick = async () => {
    await signOut(auth);
    location.reload();
  };

  return { tela, sair, aviso, erro };
}

const ui = criarInterface();

onAuthStateChanged(auth, async user => {
  if (!user) {
    sincronizado = false;
    ui.sair.hidden = true;
    ui.aviso.hidden = true;
    ui.tela.hidden = false;
    return;
  }

  ui.sair.hidden = false;

  try {
    const mudou = await sincronizar();
    sincronizado = true;
    ui.tela.hidden = true;

    if (mudou) {
      ui.aviso.textContent =
        "Dados atualizados da nuvem. Atualize a página para ver as novidades.";
      ui.aviso.hidden = false;
    }
  } catch (e) {
    console.error(e);
    ui.tela.hidden = false;
    ui.erro.textContent =
      "Não foi possível carregar seus dados. Verifique a conexão e entre novamente.";
  }
});
