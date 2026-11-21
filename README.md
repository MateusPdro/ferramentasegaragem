# Ferramentas & Garagem

**Slogan:** Escolha certo. Trabalhe melhor.

Portal editorial especializado em análises técnicas, comparativos imparciais e guias de compra de ferramentas elétricas, manuais, equipamentos automotivos e lavadoras de alta pressão, com infraestrutura pronta para monetização pelo **Programa de Afiliados do Mercado Livre**.

---

## 1. Arquitetura e Tecnologias

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, roteamento SPA com URLs amigáveis para SEO e meta tags dinâmicas + JSON-LD (`Product`, `Article`, `FAQPage`, `BreadcrumbList`).
- **Backend:** Node.js + Express (`server.ts`) com rotas REST públicas e administrativas protegidas.
- **Banco de Dados:** SQLite nativo (`node:sqlite` / `DatabaseSync`) com persistência local em arquivo (`./data/ferramentas.db`), schema relacional para categorias, produtos, múltiplos links de afiliados, rastreamento de cliques, artigos e mensagens de contato.
  - *Justificativa da escolha:* O `node:sqlite` nativo permite entrega completa, persistência real imediata e zero dependência de credenciais externas para começar a operar. Caso deseje migrar futuramente para **Supabase / PostgreSQL**, a camada de acesso está isolada em `src/server/db.ts`.
- **Autenticação Administrativa:** Hash de senha com `crypto.scryptSync` + cookies `HttpOnly` assinados com HMAC-SHA256 (`src/server/auth.ts`).

---

## 2. Instalação e Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente (opcional em desenvolvimento)
cp .env.example .env

# 3. Executar em modo desenvolvimento (Express + Vite na porta 3000)
npm run dev

# 4. Gerar build de produção e rodar
npm run build
npm start
```

### Testes automatizados

```bash
npx --yes tsx --test src/lib/catalog.test.ts
npx --yes tsx --test src/server/db.test.ts
```

---

## 3. Acesso ao Painel Administrativo (`/admin`)

Por padrão, na primeira inicialização sem variáveis customizadas, o banco cria o usuário administrador definido no `.env.example`:

- **URL:** `/admin`
- **E-mail padrão:** `admin@ferramentasegaragem.com.br`
- **Senha padrão:** `GaragemAdmin2026!`

> **Importante:** Antes de publicar em produção, defina `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `SESSION_SECRET` com valores fortes nas variáveis de ambiente do servidor.

---

## 4. Como Cadastrar Links de Afiliados do Mercado Livre

1. Acesse sua conta oficial do **Programa de Afiliados do Mercado Livre** e gere o link de divulgação para o produto desejado.
2. Entre no painel `/admin` do **Ferramentas & Garagem** e abra a aba **Produtos**.
3. Clique no ícone de edição do produto desejado.
4. Role até **Links de Afiliados (Mercado Livre)**:
   - Informe o rótulo do botão (ex.: `Ver oferta no Mercado Livre` ou `Kit com 2 baterias 127V`).
   - Cole a URL oficial gerada pelo seu painel de afiliado (`https://...`).
   - Opcionalmente, informe o preço verificado no momento da consulta e a data da atualização (se deixado em branco, o site não inventa preços).
   - Você pode clicar em **Adicionar outro link** para cadastrar variações (ex.: versão 127V e 220V).
5. Salve o produto. Os cliques no botão da página pública passam por `/go/:slug` e são contabilizados automaticamente no Dashboard do `/admin`.

---

## 5. SEO, Google Analytics 4 e Search Console

- **Sitemap dinâmico:** `/sitemap.xml` (atualizado automaticamente com produtos e artigos publicados).
- **Robots:** `/robots.txt` (bloqueia `/admin` e `/api/`).
- **Google Analytics 4:** Defina `VITE_GA4_MEASUREMENT_ID="G-XXXXXXXXXX"` no `.env`. Por conformidade LGPD, o script só é carregado quando o visitante aceita cookies analíticos na barra de consentimento.
- **Google Search Console:** Submeta a URL do seu domínio e envie `/sitemap.xml` após publicar em Vercel, Railway, Render ou VPS Node.js 22+.
