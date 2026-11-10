import { DATA } from "./data.js";

const $ = id => document.getElementById(id);

const esc = s => String(s).replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

function read(k, d) {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
}

function write(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
}

$('today').textContent = new Date().toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo'
});

const card = (l, quick) =>
  '<a href="' + esc(l[2]) + '" target="_blank" rel="noopener noreferrer">' +
  (quick
    ? '<span class="num">' + l[4] + '</span><span class="arrow">↗</span>'
    : '<small>' + esc(l[3]) + ' · ↗</small>') +
  '<strong>' + esc(l[0]) + '</strong><p>' + esc(l[1]) + '</p></a>';

$('quick').innerHTML = DATA.links.slice(0, 4).map(l => card(l, true)).join('');
$('links').innerHTML = DATA.links.map(l => card(l, false)).join('');

let live = read('cad-live-v1', null);
let category = 'Todos';
let limit = 8;

const cats = [
  'Todos', 'Certidões', 'Nomeações', 'Honorários',
  'Convênio', 'Inscrições', 'Comunicados', 'Notícias'
];

function draw() {
  $('filters').innerHTML = cats.map(c =>
    '<button class="' + (category === c ? 'active' : '') +
    '" aria-pressed="' + (category === c) +
    '" data-cat="' + c + '">' + c + '</button>'
  ).join('');

  let items = [...DATA.seed, ...(live?.items || [])];

  const seen = new Set();
  items = items.filter(i => {
    if (seen.has(i.url)) return false;
    seen.add(i.url);
    return true;
  });

  const q = $('search').value.toLocaleLowerCase('pt-BR');

  items = items.filter(i =>
    (category === 'Todos' || i.category === category) &&
    (!q || (i.title + ' ' + i.summary + ' ' + i.source)
      .toLocaleLowerCase('pt-BR').includes(q))
  );

  $('news').innerHTML = items.slice(0, limit).map(i =>
    '<article class="news">' +
    '<div class="meta"><span class="tag">' + esc(i.category) + '</span><span>' + esc(i.date) + '</span></div>' +
    '<h3><a href="' + esc(i.url) + '" target="_blank" rel="noopener noreferrer">' + esc(i.title) + '</a></h3>' +
    '<p>' + esc(i.summary) + '</p>' +
    '<a class="source-link" href="' + esc(i.url) + '" target="_blank" rel="noopener noreferrer">' +
    esc(i.source) + ' · Ler na fonte ↗</a>' +
    '</article>'
  ).join('') || '<p class="empty">Nenhuma publicação para esta busca.</p>';

  $('more').hidden = items.length <= limit;
}

function states(data) {
  $('states').innerHTML = (data?.sources || []).map(s =>
    '<div class="source-state"><b><span class="' + (s.ok ? 'ok' : 'fail') + '">' +
    (s.ok ? '●' : '◌') + '</span> <a href="' + esc(s.url) +
    '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + ' ↗</a></b>' +
    esc(s.ok
      ? 'Consultada em ' + new Date(s.checkedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      : 'Consulta indisponível: ' + s.error) +
    '</div>'
  ).join('');
}

async function refresh() {
  $('refresh').disabled = true;
  $('sync').textContent = 'Buscando o feed publicado…';

  try {
    const r = await fetch('./feed.json?at=' + Date.now(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(25000)
    });

    if (!r.ok) throw Error('consulta indisponível');

    const next = await r.json();

    if (!Array.isArray(next.items) || !Array.isArray(next.sources)) {
      throw Error('Feed inválido');
    }

    live = next;
    write('cad-live-v1', live);
    states(live);
    draw();

    const n = live.sources.filter(s => s.ok).length;
    const collected = live.attemptedAt
      ? new Date(live.attemptedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      : 'ainda não executada';

    $('sync').textContent =
      'Feed carregado agora. Última coleta das fontes: ' + collected + '. ' +
      n + '/' + live.sources.length + ' fontes disponíveis na coleta. ' +
      (n < live.sources.length
        ? 'Há fontes indisponíveis; confira os acessos oficiais. '
        : '') +
      'A coleta é programada no GitHub; abrir o app não inicia uma nova pesquisa nas fontes.';

  } catch (e) {
    $('sync').textContent =
      'Não foi possível atualizar agora. ' +
      (live
        ? 'Exibindo o último conteúdo salvo neste navegador.'
        : 'Exibindo a seleção conferida em 28/10/2026.') +
      ' Use os acessos oficiais para conferir novidades.';
    states(live);
  } finally {
    $('refresh').disabled = false;
  }
}

$('filters').onclick = e => {
  if (e.target.dataset.cat) {
    category = e.target.dataset.cat;
    limit = 8;
    draw();
  }
};

$('search').oninput = () => {
  limit = 8;
  draw();
};

$('more').onclick = () => {
  limit += 10;
  draw();
};

$('refresh').onclick = refresh;

$('notes').value = read('cad-notes-v2', '');

$('saveNote').onclick = () => {
  $('noteStatus').textContent = write('cad-notes-v2', $('notes').value)
    ? 'Notas salvas.'
    : 'Não foi possível salvar. Exporte uma cópia.';
};

$('exportNote').onclick = () => {
  const url = URL.createObjectURL(
    new Blob([$('notes').value], { type: 'text/plain;charset=utf-8' })
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = 'minhas-notas-cad.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

draw();
states(live);
refresh();

// Trocas de escala: registros locais, compatíveis com a chave do aplicativo antigo.

let trocas = read('trocas', []);
let editId = null;

if (!Array.isArray(trocas)) trocas = [];

const localDate = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
};

const dateBR = d => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

$('eData').value = localDate();
$('eMes').value = localDate().slice(0, 7);

function filteredTrades() {
  const m = $('eMes').value;
  const s = $('eStatus').value;
  const q = $('eBusca').value.toLocaleLowerCase('pt-BR');

  return trocas
    .filter(t =>
      (!m || t.data.startsWith(m)) &&
      (!s || t.status === s) &&
      (!q || (t.sai + ' ' + t.entra).toLocaleLowerCase('pt-BR').includes(q))
    )
    .sort((a, b) => a.data.localeCompare(b.data));
}

function renderTrades() {
  const items = filteredTrades();

  $('totalTrades').textContent = items.length;
  $('pendingTrades').textContent = items.filter(t => t.status === 'Pendente').length;
  $('confirmedTrades').textContent = items.filter(t => t.status === 'Confirmada').length;

  // A lista <datalist id="advs"> foi removida: o autocomplete agora está no advogados.js.
  // Esta verificação evita erro caso o elemento não exista.
  const advs =
