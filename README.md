# Alianças Bauru Moedas

Site institucional e página do Instagram da Alianças Bauru Moedas (Bauru/SP).

- `public/index.html`: site
- `public/links.html`: página da bio do Instagram (endereço `/links`)
- `public/privacidade.html`: política de privacidade (endereço `/privacidade`)

HTML e CSS puros, sem etapa de build. Hospedado na Vercel: publica só a pasta `public/`, com cabeçalhos de segurança e endereços curtos (ver `vercel.json`).

Publicar: na Vercel, **Add New → Project → Import** este repositório e clicar em **Deploy** (não precisa mudar nada; a configuração vem do `vercel.json`). Cada envio ao ramo `main` atualiza o site.

Rodar no computador: `cd public && python3 -m http.server 8765`
