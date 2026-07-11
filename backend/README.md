# Portfolio Backend

API em Java 21 + Spring Boot 3.5 que recebe as mensagens enviadas pelo formulário de
contato do portfólio (`../index.html`). O site em si continua estático, publicado no
GitHub Pages — esse backend roda à parte, publicado no Render, e o frontend fala com
ele via `fetch()` (veja `../assets/js/contact.js` e `window.PORTFOLIO_API_BASE_URL`
setado em `../index.html`).

**Status:** no ar em `https://artfrc-portfolio-backend.onrender.com`, com
notificação no Telegram testada de ponta a ponta (site publicado → API → Telegram).

## Rodando localmente

Pré-requisitos: JDK 21+ e Maven (ou use o `mvnw` se preferir gerar o wrapper).

```bash
cd backend
mvn spring-boot:run
```

O servidor sobe em `http://localhost:8080`. Um banco H2 em arquivo é criado em
`backend/data/` na primeira execução (persiste entre reinícios; está no `.gitignore`).

Depois de rodar, abra `index.html` do projeto (ex.: `python3 -m http.server 5500` na
raiz do repo) — a origem `http://localhost:5500` já está liberada no CORS
(`application.yml` → `portfolio.allowed-origins`).

## Endpoints

| Método | Rota                | Descrição                                              |
|--------|----------------------|---------------------------------------------------------|
| POST   | `/api/contact`       | Envia uma mensagem (público, com rate limit por IP)     |
| GET    | `/api/contact`       | Lista as mensagens recebidas (exige header `X-API-KEY`) |
| GET    | `/swagger-ui.html`   | Documentação interativa (OpenAPI/Swagger)                |
| GET    | `/actuator/health`   | Health check                                             |
| GET    | `/h2-console`        | Console do banco H2 (JDBC URL no `application.yml`)      |

A API key padrão de dev é `changeme-local-key` (`portfolio.admin-api-key` em
`application.yml`, sobrescrevível pela env var `PORTFOLIO_ADMIN_KEY`).

## Notificação no Telegram (opcional)

Sem configurar nada, toda mensagem nova só é gravada no banco e logada no console
(`LoggingContactNotifier`). Pra receber um push no Telegram na hora que alguém envia
o formulário:

1. Fale com [@BotFather](https://t.me/BotFather) no Telegram, mande `/newbot` e siga
   as instruções. No final ele te dá um **token** (algo como `123456789:AAF...`).
2. Mande qualquer mensagem pro bot que você acabou de criar (senão ele não consegue
   te responder).
3. Pegue seu **chat id**: acesse
   `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates` no navegador (com o token do
   passo 1) e procure `"chat":{"id":...}` na resposta.
4. Exporte as duas variáveis antes de subir o backend:

   ```bash
   export PORTFOLIO_TELEGRAM_BOT_TOKEN="123456789:AAF..."
   export PORTFOLIO_TELEGRAM_CHAT_ID="999999999"
   mvn spring-boot:run
   ```

Com as duas variáveis presentes, o `NotifierConfig` troca automaticamente para o
`TelegramContactNotifier`. Se o Telegram estiver fora do ar ou o token for inválido,
a falha só é logada — a mensagem já foi salva no banco antes disso, então quem
preencheu o formulário nunca vê um erro por causa disso.

## Exemplo de uso

```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Recrutador","email":"r@empresa.com","subject":"Vaga","message":"Oi!"}'

curl http://localhost:8080/api/contact -H "X-API-KEY: changeme-local-key"
```

## Arquitetura

```
contact/       entidade, repositório JPA, DTOs (records), service e controller
notification/  ContactNotifier — interface para "avisar alguém que chegou mensagem".
               NotifierConfig escolhe em runtime: sem PORTFOLIO_TELEGRAM_* configurado
               usa LoggingContactNotifier (só loga); com as duas vars, usa
               TelegramContactNotifier (push via Bot API). Dá pra plugar um e-mail
               real (SMTP/JavaMailSender) implementando a mesma interface.
security/      ApiKeyFilter — protege o GET /api/contact
ratelimit/     RateLimitFilter — janela fixa em memória por IP no POST /api/contact
common/        ApiError + GlobalExceptionHandler (400 com erro por campo, 500 genérico)
config/        PortfolioProperties (portfolio.* tipado) + CorsConfig
openapi/       metadados do Swagger
```

Pontos de extensão pensados de propósito:
- **Outro canal de notificação**: implementar outro `ContactNotifier` (ex.: e-mail via
  `JavaMailSender`, Discord, ntfy.sh) e ajustar `NotifierConfig` — o resto do app não muda.
- **Banco de produção**: trocar o datasource do H2 por Postgres/MySQL no
  `application.yml`; o `ddl-auto: update` e o resto do código JPA já funcionam.
- **Deploy público**: já publicado no Render — veja a seção "Deploy no Render" abaixo.

## Deploy no Render

O repo já tem tudo pronto pra isso: `render.yaml` (blueprint) na raiz do repo e
`backend/Dockerfile`. O H2 fica no disco efêmero do container — some a cada novo
deploy/restart, mas a notificação no Telegram é disparada na hora, independente do
banco, então isso não afeta o fluxo de notificação.

1. Crie uma conta em [render.com](https://render.com) (dá pra logar com GitHub).
2. **New > Blueprint**, conecte este repositório. O Render lê o `render.yaml` e cria
   o serviço `artfrc-portfolio-backend` sozinho (root dir `backend/`, build via
   Docker, health check em `/actuator/health`).
3. Quando ele pedir os env vars marcados como secret, preencha com os valores do seu
   `backend/.env` local:
   - `PORTFOLIO_TELEGRAM_BOT_TOKEN`
   - `PORTFOLIO_TELEGRAM_CHAT_ID`
   - `PORTFOLIO_ADMIN_KEY` (defina uma chave sua, não deixe o padrão de dev)
4. Deploy. O primeiro build demora alguns minutos (baixa as dependências Maven).
5. Confirme a URL pública gerada (algo como
   `https://artfrc-portfolio-backend.onrender.com`). Se vier diferente do nome usado
   em `render.yaml`, atualize `window.PORTFOLIO_API_BASE_URL` em `../index.html` pra
   bater com a URL real.
6. Teste com curl (troque a URL):
   ```bash
   curl -X POST https://artfrc-portfolio-backend.onrender.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Teste","email":"t@t.com","subject":"Oi","message":"Testando o deploy"}'
   ```
   Deve chegar uma mensagem no Telegram poucos segundos depois.

No plano free do Render o serviço "dorme" depois de ~15 min sem tráfego e o primeiro
request depois disso demora uns 30-50s pra acordar (o frontend já mostra um aviso
pra esse caso, veja `assets/js/contact.js`).

## Testes

```bash
mvn test
```

`ContactServiceTest` cobre a lógica de negócio com Mockito; `ContactControllerTest`
sobe o contexto Spring completo (`@SpringBootTest` + `MockMvc`, perfil `test`, H2 em
memória) e testa envio válido, validação, e o bloqueio por API key do endpoint admin;
`TelegramContactNotifierTest` usa `MockRestServiceServer` pra validar a chamada HTTP
pro Bot API (sucesso e falha) sem precisar de um token real.
