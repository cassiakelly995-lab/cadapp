// Lista de advogados e sugestões de autocomplete do Painel CAD.
// Movido do index.html para permitir a Política de Segurança de Conteúdo (CSP).

const ADVOGADOS = [
  { nome: "AGNALDO ALVES DE SIQUEIRA", oab: "497500" },
  { nome: "ALESSANDRA DA SILVA", oab: "505895" },
  { nome: "ALEXANDRE DIAS MIZUTANI", oab: "341199" },
  { nome: "ALEXSANDRO MARINS MORAES", oab: "221802" },
  { nome: "ALINE LOSANO DE ARAUJO SILVA", oab: "542890" },
  { nome: "ANA FLÁVIA LEANDRA SILVEIRA", oab: "467427" },
  { nome: "ANA PAULA ABREU DE AGUIAR BAVARESCO", oab: "282928" },
  { nome: "ANA PAULA COMIN LODEIRO BIANCHINI D'EMILIO", oab: "220479" },
  { nome: "ANNA LUIZA TOZZI DE ALMEIDA VILLELA RIMOLA", oab: "497336" },
  { nome: "ANNY YOO MI CHAE", oab: "401117" },
  { nome: "BEATRIZ BARBOSA PEREIRA", oab: "507048" },
  { nome: "BEATRIZ OLANDA GUIMARÃES COSTA", oab: "534315" },
  { nome: "BEATRIZ RAVANHANI DE SOUZA", oab: "378994" },
  { nome: "BRUNA MENDES CASAGRANDE", oab: "376551" },
  { nome: "BRUNO ELSNER CARUSO", oab: "492686" },
  { nome: "CARLA BENEDICTO SOUZA", oab: "466165" },
  { nome: "CARLA SILVIA KAWAMURA", oab: "514303" },
  { nome: "CARLOS EDUARDO CORREA DUARTE", oab: "352147" },
  { nome: "CAROLINE DA SILVA DIAS", oab: "498663" },
  { nome: "CAROLINE MICHELE SCHMITT", oab: "371669" },
  { nome: "CLAUDIA PACIULLI AZEVEDO PARISE", oab: "293792" },
  { nome: "CLAUDIA REGINA DE OLIVEIRA", oab: "203871" },
  { nome: "CLAUDIO FERRUCCIO DE SIQUEIRA ROSIN", oab: "359821" },
  { nome: "DANIEL AMBROSIO DA SILVA JUNIOR", oab: "404033" },
  { nome: "DIEGO MARTINS ALVES", oab: "278918" },
  { nome: "DORACI DA SILVA SOBRAL", oab: "237496" },
  { nome: "EDSON ALMEIDA DA MOTA", oab: "177602" },
  { nome: "EDUARDO HENRIQUE SOARES CLAUDIO ARRUDA", oab: "529713" },
  { nome: "ELCIO CARLOS ALMEIDA FERREIRA", oab: "407205" },
  { nome: "ELISANGELA SANTOS DE LIMA TEIXEIRA", oab: "542263" },
  { nome: "ELISE RAMOUNOULOU MADELLA", oab: "308744" },
  { nome: "EVELYN CARINA DE OLIVEIRA NUNES", oab: "382013" },
  { nome: "FLÁVIA CARMO FERREIRA", oab: "497818" },
  { nome: "GABRIELA DE CAMARGO PRADO", oab: "453127" },
  { nome: "GABRIELA MOREIRA SILVA", oab: "458167" },
  { nome: "GIANNA DA CUNHA PIOTTI", oab: "196155" },
  { nome: "GISELE QUELHO KAISER SALIBA ANDRADE", oab: "354545" },
  { nome: "GUSTAVO ORLANDO COSTA", oab: "437605" },
  { nome: "HELEN CRISTINA DE FREITAS", oab: "372917" },
  { nome: "HELEN SANTOS OLIVEIRA", oab: "388846" },
  { nome: "IARA SILVIA MAINARDI KOGA", oab: "71625" },
  { nome: "ISABEL MARIA DOS SANTOS BISPO", oab: "255149" },
  { nome: "ISABELLA XAVIER LOBO", oab: "446064" },
  { nome: "ISAYENE FERREIRA DE ARAÚJO", oab: "540607" },
  { nome: "ISTEFANI SANTOS LIMA", oab: "540739" },
  { nome: "IZABELA EVANGELISTA SOARES", oab: "471502" },
  { nome: "JANAINA LOPES DE CASTRO", oab: "380479" },
  { nome: "JANE COUTO INSFRAN DE OLIVEIRA", oab: "328202" },
  { nome: "JAQUELINE DA SILVA MACHADO", oab: "489267" },
  { nome: "JOÃO MARCO TEIXEIRA DE SOUZA BRAGA", oab: "404113" },
  { nome: "JUSCILENE PINHEIRO GONÇALVES SANT'ANA", oab: "462257" },
  { nome: "KENIA JOYCE ROSARIO DA SILVA", oab: "530777" },
  { nome: "LEONARDO LUIS DIAS", oab: "397568" },
  { nome: "LILIAN JOIA FERRARO", oab: "324608" },
  { nome: "LUANA GONÇALVES SOUSA DE CARVALHO", oab: "521204" },
  { nome: "LUIS GUSTAVO CIGANA CRIVELLARO", oab: "250156" },
  { nome: "LUIZ CARLOS SARRA", oab: "100618" },
  { nome: "MARCO ANTONIO DE CARVALHO SANTOS", oab: "93671" },
  { nome: "MARCOS RODRIGUES DA SILVA", oab: "524960" },
  { nome: "MARIA BELINHA DE SOUZA FREITAS", oab: "245227" },
  { nome: "MARIA DE FATIMA PEREIRA", oab: "110007" },
  { nome: "MARIA FERNANDA LIMA RODRIGUES NASCIMENTO", oab: "318731" },
  { nome: "MARIA IVONE DOS REIS", oab: "328246" },
  { nome: "MARIANE CORREA DA CRUZ MESSERLIAN", oab: "296508" },
  { nome: "MARINA HONÓRIO FERREIRA", oab: "411477" },
  { nome: "MARISTELA GONÇALVES DA SILVA", oab: "411478" },
  { nome: "MATEUS ASSIS DA SILVA", oab: "501237" },
  { nome: "MATEUS GROPPO PICHARKI", oab: "402760" },
  { nome: "MATHEUS GUSTAVO SILVA", oab: "518501" },
  { nome: "MICHELLY CRISTINA FELIX DA SILVA", oab: "353702" },
  { nome: "NATALIA RODRIGUES LOPES", oab: "434793" },
  { nome: "NATHÁLIA DOS ANJOS DE PAULA", oab: "547243" },
  { nome: "NELSON ALEXANDER SCHEPIS MONTINI", oab: "316892" },
  { nome: "PATRICIA GONGORA RODRIGUES SILVA", oab: "154745" },
  { nome: "PEDRO DEMETRIO JUSTER DA SILVA", oab: "535506" },
  { nome: "PRISCILA GABRIELA MENDES", oab: "467653" },
  { nome: "QUEZIA HAPUQUE SOUZA PIRES", oab: "478071" },
  { nome: "RAQUEL ALEXANDRE PEREIRA DA SILVA", oab: "457789" },
  { nome: "RAQUEL HONORATO MOREIRA DA SILVA", oab: "483672" },
  { nome: "REGINA DE OLIVEIRA BRAGA", oab: "102971" },
  { nome: "RENATA UCCI", oab: "101079" },
  { nome: "RITA DE CASSIA SILVERIO", oab: "215372" },
  { nome: "RITA DE CASSIA VIEIRA BRANCO DE OLIVEIRA MENDES", oab: "466270" },
  { nome: "ROBERTO SOUZA DA SILVA", oab: "377486" },
  { nome: "ROBSON CAVALHEIRO", oab: "475433" },
  { nome: "ROGERIO VAGNER REZENDE", oab: "217767" },
  { nome: "ROSANA DE CASSIA BORGES BIANCALANA", oab: "165941" },
  { nome: "ROSANA DE SOUZA", oab: "380358" },
  { nome: "SANDRA CAVALCANTI PETRIN", oab: "128412" },
  { nome: "SARA DOS SANTOS", oab: "457273" },
  { nome: "SARAH LÍVIA PIMENTEL RESENDE", oab: "377501" },
  { nome: "SÉRGIO AMARAL", oab: "378901" },
  { nome: "SHIRLEY GUIMARÃES COSTA", oab: "190341" },
  { nome: "SILVIO DE SOUSA OLIVEIRA", oab: "487610" },
  { nome: "STEFANY ALVES LOPES", oab: "537073" },
  { nome: "SUELEN SOUZA SAMPAIO", oab: "499677" },
  { nome: "SUELY APARECIDA GIANNINI BORGES", oab: "264054" },
  { nome: "SUZANA GAVA MARINS MORAES", oab: "546844" },
  { nome: "TELMA GONÇALVES DO NASCIMENTO", oab: "275241" },
  { nome: "THALITA GONÇALVES MARANGONI", oab: "282258" },
  { nome: "VALÉRIA BARBOSA PACHECO", oab: "378920" },
  { nome: "VERONICE STECHE BURG", oab: "295470" },
  { nome: "VICTOR LOPEZ MANSO VIEIRA", oab: "325460" },
  { nome: "VINÍCIUS COEVAS CASTILHO", oab: "504816" },
  { nome: "VIVIANE APARECIDA PIRES DE PAULA OLIVEIRA MELO", oab: "481424" },
  { nome: "WALDILARA FERREIRA ANTUNES", oab: "520021" },
  { nome: "WILLIAN DE LIMA FARIAS", oab: "402567" }
];

const LIMITE_NOME = 160;
const LIMITE_NOMES_SALVOS = 500;

function normalizar(valor) {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function buscarAdvogados(consulta, extras = []) {
  const termos = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (!termos.length) return [];

  const lista = [...ADVOGADOS];
  const existentes = new Set(lista.map(p => normalizar(p.nome)));

  for (const nome of extras) {
    const chave = normalizar(nome);
    if (chave && !existentes.has(chave)) {
      existentes.add(chave);
      lista.push({ nome: String(nome), oab: "" });
    }
  }

  return lista
    .filter(pessoa => {
      const texto = normalizar(pessoa.nome + " " + pessoa.oab);
      return termos.every(termo => texto.includes(termo));
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

function ativarSugestoes(input, getExtras = () => []) {
  if (document.getElementById(input.id + "-opcoes")) return;

  input.removeAttribute("list");
  input.autocomplete = "off";
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-controls", input.id + "-opcoes");
  input.setAttribute("aria-describedby", "advogadosHint");

  const wrapper = document.createElement("div");
  wrapper.className = "autocomplete-wrapper";
  input.before(wrapper);
  wrapper.append(input);

  const dropdown = document.createElement("div");
  dropdown.className = "autocomplete-dropdown";
  dropdown.hidden = true;

  const lista = document.createElement("div");
  lista.id = input.id + "-opcoes";
  lista.setAttribute("role", "listbox");
  lista.setAttribute("aria-label", "Advogados encontrados");

  const mensagem = document.createElement("div");
  mensagem.className = "autocomplete-status";
  mensagem.setAttribute("role", "status");

  dropdown.append(lista, mensagem);
  wrapper.append(dropdown);

  let resultados = [];
  let ativo = -1;

  function fechar() {
    dropdown.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    ativo = -1;
  }

  function selecionar(indice) {
    const pessoa = resultados[indice];
    if (!pessoa) return;
    input.value = pessoa.nome;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    fechar();
    input.focus();
  }

  function destacar(indice) {
    ativo = indice;
    [...lista.children].forEach((elemento, i) => {
      elemento.setAttribute("aria-selected", String(i === ativo));
      elemento.classList.toggle("is-active", i === ativo);
    });
    if (ativo >= 0) {
      const elemento = lista.children[ativo];
      input.setAttribute("aria-activedescendant", elemento.id);
      elemento.scrollIntoView({ block: "nearest" });
    }
  }

  function mostrar() {
    const encontrados = buscarAdvogados(input.value, getExtras());
    resultados = encontrados.slice(0, 12);
    ativo = -1;
    input.removeAttribute("aria-activedescendant");
    lista.replaceChildren();

    if (!input.value.trim()) {
      fechar();
      return;
    }

    resultados.forEach((pessoa, indice) => {
      const opcao = document.createElement("div");
      opcao.id = lista.id + "-" + indice;
      opcao.className = "autocomplete-option";
      opcao.setAttribute("role", "option");
      opcao.setAttribute("aria-selected", "false");

      const nome = document.createElement("strong");
      nome.textContent = pessoa.nome;

      const oab = document.createElement("small");
      oab.textContent = pessoa.oab
        ? "OAB SP " + pessoa.oab
        : "Nome usado neste aparelho";

      opcao.append(nome, oab);

      opcao.addEventListener("pointerdown", evento => evento.preventDefault());
      opcao.addEventListener("click", () => selecionar(indice));

      lista.append(opcao);
    });

    if (!encontrados.length) {
      mensagem.textContent =
        "Nenhum nome encontrado. Você pode preencher manualmente.";
    } else if (encontrados.length > 12) {
      mensagem.textContent =
        "Mostrando 12 de " + encontrados.length +
        ". Continue digitando para refinar.";
    } else {
      mensagem.textContent =
        encontrados.length + " profissional(is) encontrado(s).";
    }

    dropdown.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("input", mostrar);

  input.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
      fechar();
      return;
    }

    if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
      if (dropdown.hidden) mostrar();
      if (!resultados.length) return;

      evento.preventDefault();

      let proximo;
      if (evento.key === "ArrowDown") {
        proximo = (ativo + 1) % resultados.length;
      } else {
        proximo = ativo < 0
          ? resultados.length - 1
          : (ativo - 1 + resultados.length) % resultados.length;
      }
      destacar(proximo);
      return;
    }

    if (evento.key === "Enter" && !dropdown.hidden && ativo >= 0) {
      evento.preventDefault();
      selecionar(ativo);
      return;
    }

    if (evento.key === "Tab") fechar();
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      if (document.activeElement !== input) fechar();
    }, 120);
  });

  input.form?.addEventListener("reset", fechar);
}

// Lê os nomes já usados nas trocas salvas, com validação básica.
function nomesJaUsados() {
  try {
    const trocas = JSON.parse(localStorage.getItem("trocas") || "[]");
    if (!Array.isArray(trocas)) return [];

    return trocas
      .slice(0, LIMITE_NOMES_SALVOS)
      .flatMap(troca => [troca?.sai, troca?.entra])
      .filter(nome => typeof nome === "string" && nome.length <= LIMITE_NOME);
  } catch {
    return [];
  }
}

function iniciarListaDeAdvogados() {
  ["eSai", "eEntra"].forEach(id => {
    const campo = document.getElementById(id);
    if (campo) ativarSugestoes(campo, nomesJaUsados);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarListaDeAdvogados, { once: true });
} else {
  iniciarListaDeAdvogados();
}
