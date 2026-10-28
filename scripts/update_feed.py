"""Coleta títulos e links oficiais. Sem chaves de API ou dependências externas."""
import concurrent.futures
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
NOW = datetime.now(timezone.utc).isoformat()

class Anchors(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items, self.current = [], None
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.current = {'href': dict(attrs).get('href', ''), 'parts': []}
    def handle_data(self, data):
        if self.current is not None:
            self.current['parts'].append(data)
    def handle_endtag(self, tag):
        if tag == 'a' and self.current is not None:
            self.items.append(self.current)
            self.current = None

def relevant(title, path, kind):
    text = title.casefold()
    if kind == 'news':
        return bool(re.search(r'/(noticia|jornaldaadvocacia)/', path) and re.search(r'dativ|certid|assistência judiciária|convênio', text))
    if kind == 'docs':
        return 'comunicado' in text and bool(re.search(r'conven|convên|nomea|certid|e-social', text))
    if kind == 'edital':
        return bool(re.search(r'202[6-9]', text) and re.search(r'lista|homolog|edital|inscri|revalid', text))
    return 'termo de convênio' in text and bool(re.search(r'202[6-9]', text))

def publication_date(title, path):
    match = re.search(r'/(\d{2})-(\d{2})-(\d{2})-', path)
    if match:
        year, month, day = (int(v) for v in match.groups())
        try:
            date = datetime(2000 + year, month, day)
            return date.strftime('%d/%m/%Y'), date.strftime('%Y-%m-%d')
        except ValueError:
            pass
    year = re.search(r'\b(20\d{2})\b', title)
    if year:
        return 'Referência a ' + year[1] + ' · confira a data na fonte', year[1] + '-01-01'
    return 'Data de publicação: consultar a fonte', ''

def collect(source, old):
    state = {k: source[k] for k in ['name', 'url']}
    state['attemptedAt'] = NOW
    try:
        req = urllib.request.Request(source['url'], headers={'User-Agent': 'CAD-SP-Feed/2.0 (+public official links)', 'Accept': 'text/html'})
        with urllib.request.urlopen(req, timeout=25) as response:
            if 'text/html' not in response.headers.get('Content-Type', ''):
                raise ValueError('Formato diferente de HTML')
            body = response.read(6_000_000).decode(response.headers.get_content_charset() or 'utf-8', errors='replace')
        parser = Anchors()
        parser.feed(body)
        items, seen = [], set()
        for anchor in parser.items:
            title = re.sub(r'\s+', ' ', ' '.join(anchor['parts'])).strip()
            url = urllib.parse.urljoin(source['url'], anchor['href'])
            parsed = urllib.parse.urlparse(url)
            host = parsed.hostname or ''
            if parsed.scheme != 'https' or not any(host == d or host.endswith('.' + d) for d in ['oabsp.org.br', 'defensoria.sp.def.br']):
                continue
            if len(title) < 16 or url in seen or not relevant(title, parsed.path, source['kind']):
                continue
            seen.add(url)
            label, sort_date = publication_date(title, parsed.path)
            items.append({'title': title[:300], 'url': url, 'source': source['name'], 'category': source['category'], 'date': label, 'sortDate': sort_date, 'summary': 'Publicação localizada na página oficial. Confira no documento a vigência e as orientações completas.', 'collectedAt': NOW})
        if not items:
            raise ValueError('Nenhuma publicação reconhecida; conferir página e coletor')
        state.update(ok=True, checkedAt=NOW)
        return state, items[:30]
    except Exception as error:
        previous = next((s for s in old.get('sources', []) if s.get('name') == source['name']), {})
        state.update(ok=False, error=str(error)[:240])
        if previous.get('checkedAt'):
            state['checkedAt'] = previous['checkedAt']
        return state, [item for item in old.get('items', []) if item.get('source') == source['name']]

def main():
    old = json.loads((ROOT / 'feed.json').read_text(encoding='utf-8'))
    sources = json.loads((ROOT / 'sources.json').read_text(encoding='utf-8'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        results = list(pool.map(lambda source: collect(source, old), sources))
    unique = {}
    for _, items in results:
        for item in items:
            unique.setdefault(item['url'], item)
    payload = {'version': '2.0.0', 'attemptedAt': NOW, 'sources': [state for state, _ in results], 'items': sorted(unique.values(), key=lambda i: i.get('sortDate', ''), reverse=True)}
    (ROOT / 'feed.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    success = sum(state['ok'] for state, _ in results)
    print(f'Coleta: {success}/{len(sources)} fontes; {len(unique)} publicações. Falhas preservam o conteúdo anterior.')
    for state, _ in results:
        if not state['ok']:
            print('Aviso:', state['name'], state.get('error', ''))

if __name__ == '__main__':
    main()
