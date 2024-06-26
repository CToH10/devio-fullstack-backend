# API fast food
<br>

### devio-fullstack-back
API desenvolvida para teste técnico

## Setup

Ao clonar, é importante seguir o exemplo dado no `.env.example` e configurar suas variáveis de ambiente em um `.env` próprio.

```
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
PORT=3001

```

Em seguida, execute o comando de instalação:

```bash
yarn || npm install || pnpm install
```
Depois de instalar todos os pacotes, execute:

```bash
${yarn || npm run || pnpm run} prisma migrate dev
```

Para testar o servidor, execute:

```bash
${yarn || npm run || pnpm run} dev
```

Com o servidor local rodando, uma cópia dos endpoints e schemas da aplicação está disponível em `http://localhost:3001/api-docs`.

## Servidor remoto

O servidor também está remotamente disponível em `https://devio-fullstack-backend.onrender.com`, com a respectiva [documentação](https://devio-fullstack-backend.onrender.com/api-docs/).

<br>
<br>
Para testar a API você pode utilizar:

<br>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=fast&uri=https%3A%2F%2Fgithub.com%2FCToH10%2Fdevio-fullstack-frontend%2Fblob%2Fmain%2FInsomnia_2024-03-25.json)
