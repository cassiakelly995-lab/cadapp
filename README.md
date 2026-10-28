# CAD — Advocacia Dativa SP

Aplicativo web instalável (PWA), com visual azul, ícone da Advocacia Dativa, acessos oficiais, publicações, guia, notas e trocas de escala. Arquivos separados, sem compilação ou serviços privados.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub com a branch principal chamada **main**. Em uma conta gratuita, use repositório público para o Pages.
2. Extraia o ZIP e envie **o conteúdo da pasta cad-github para a raiz do repositório**. O `index.html` deve ficar na raiz, junto de `styles.css`, `app.js` e os demais arquivos.
3. Inclua as pastas **icons**, **scripts** e **.github/workflows**. A pasta `.github` começa com ponto e não pode faltar. O ZIP contém essa pasta; confira se ela apareceu no repositório após o envio.
4. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
5. Abra **Actions → Atualizar publicações e publicar CAD → Run workflow**. Se o GitHub pedir para habilitar Actions, habilite.
6. Aguarde a execução ficar verde. O endereço do app aparece em **Settings → Pages** e no resultado da etapa de publicação. Geralmente é `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Se a execução automática começar antes de ativar o Pages e falhar, ative o Pages e execute novamente.

O workflow usa a permissão padrão do GitHub para gravar somente o feed e publicar o site; não exige token pessoal ou chave de API. Regras de proteção que bloqueiem commits do bot podem impedir a atualização: nesse caso, permita esse fluxo conforme as regras do seu repositório. O workflow está configurado para a branch `main`; se usar outra branch, altere o campo `branches` no YAML.

## Instalar no celular

**Não basta baixar o ZIP.** Primeiro publique o app e abra o endereço HTTPS no celular.

- **Android:** abra no Chrome e use **menu → Instalar aplicativo** ou **Adicionar à tela inicial**. A aba “Instalar aplicativo” também oferece um botão quando o navegador disponibiliza a instalação.
- **iPhone:** abra no Safari e use **Compartilhar → Adicionar à Tela de Início**.

O ícone aparece na tela inicial e abre o app em uma janela própria quando o navegador oferece esse modo. Não é APK e não exige Play Store ou App Store.

## Como as notícias são atualizadas

O GitHub Pages hospeda arquivos estáticos; ele não executa uma pesquisa nos sites da OAB/Defensoria a cada abertura.

Por isso, o workflow incluído consulta as fontes **a cada seis horas**, além de executar quando você envia mudanças e quando usa **Run workflow**. O coletor salva títulos e links no `feed.json` e publica o resultado. Ao abrir o aplicativo ou tocar em “Atualizar publicações”, o celular baixa o feed publicado mais recente.

O app mostra separadamente a abertura do feed e a data da última coleta. Não representa a coleta anterior como uma consulta nova às fontes. As páginas monitoradas estão em `sources.json`: notícias da CAD, Comissão da Advocacia Dativa, comunicados, editais e termos do convênio da Defensoria.

Não há garantia de cobertura de tudo o que ocorre na advocacia dativa. O coletor acompanha as páginas configuradas, pode falhar se a estrutura delas mudar, e não decide se um comunicado revoga outro. A seleção resumida do `data.js` e o guia do `index.html` têm data própria de revisão e precisam ser revisados quando as regras mudarem. Publicações antigas permanecem identificadas por sua referência/data, quando disponível.

Se uma fonte falhar, o coletor preserva seus itens anteriores e registra a falha. O GitHub pode atrasar rotinas programadas; em repositórios públicos inativos por 60 dias, pode desabilitá-las. Confira **Actions** periodicamente e reative quando necessário. Sem internet, o app informa a falha e usa a última cópia disponível no dispositivo.

## Trocas de escala

Na aba **Trocas de escala**, é possível registrar, editar, excluir, confirmar, filtrar por mês/situação/nome, copiar resumo e exportar CSV. Há backup JSON e importação que preserva registros existentes com o mesmo identificador.

As trocas e as notas ficam **somente no navegador e aparelho usados**; não são enviadas ao GitHub e não sincronizam entre celulares. Marcar uma troca como confirmada não envia aviso nem faz autorização institucional. Para compartilhar, use o resumo e faça o envio por conta própria.

O aplicativo mantém a chave local `trocas` do original. Se substituir o app no mesmo domínio e navegador, os registros nessa chave serão reaproveitados. Mudança de domínio/origem exige backup e importação; o navegador não transfere dados entre origens. Exporte sempre uma cópia antes de trocar de endereço ou limpar dados do navegador.

## Arquivos

```text
index.html                      Estrutura das telas e guia
styles.css                      Cores, estilos e adaptação ao celular
app.js                          Interações, feed, trocas, notas e instalação
data.js                         Acessos oficiais e seleção editorial
feed.json                       Publicações coletadas e status das fontes
sources.json                    Páginas oficiais monitoradas
manifest.webmanifest            Nome, ícones e configuração de instalação
sw.js                           Cache para abertura offline
icons/                          Ícone original e tamanhos para instalação
scripts/update_feed.py          Coletor sem dependências externas
.github/workflows/
  atualizar-e-publicar.yml       Coleta programada e publicação no Pages
.nojekyll                       Desativa o processamento Jekyll
```

Para atualizar o visual/código, edite os arquivos e altere `CACHE_VERSION` no `sw.js`. Uma nova versão do service worker fica pronta em segundo plano; feche todas as janelas do app e reabra para ativá-la. O feed usa prioridade de rede e independe da troca dessa versão.

Para teste local, use `python -m http.server 8000` na pasta e abra `http://localhost:8000/`. Não abra o `index.html` com duplo clique: módulos JavaScript e instalação precisam de um servidor. Para executar a coleta manualmente: `python scripts/update_feed.py` (Python 3.10+).

## Referências

- [GitHub Pages com workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Agendamento no GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
- [Instalação de aplicativos web — MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)

Central independente. Não é um aplicativo oficial da OAB SP ou da Defensoria Pública.
