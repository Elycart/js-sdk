# Elycart SDK для TypeScript/JavaScript

[![npm](https://img.shields.io/npm/v/elycart-api?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/elycart-api)
[![JSR](https://jsr.io/badges/@kravets/elycart-api)](https://jsr.io/@kravets/elycart-api)
[![JSR Score](https://jsr.io/badges/@kravets/elycart-api/score)](https://jsr.io/@kravets/elycart-api)

Библиотека для взаимодействия с [API Elycart](https://docs.elycart.com/).

```ts
import { Elycart } from "elycart-api";

const elycart = new Elycart(process.env.TOKEN, process.env.SECRET_KEY);

const payment = await elycart.createInvoice({
    title: "Покупка донат-кейса",
    username: "elycart",
    price: 10, // рублей
});

console.log(payment.url);
```

[API Reference](https://jsr.io/@kravets/elycart-api/doc)

### Фичи

-   Генерируется исходя из **OpenAPI** спецификации
-   Очень удобная работа с нотификацией (webhook) с умными фильтрами
-   Имеет в себе [webhook адаптеры для самых популярных фреймворков](#поддерживаемые-webhook-адаптеры)
<!-- -   Удобна и для [нескольких касс](#режим-мульти-кассы) -->
-   Отличная документация кода с помощью **JSDoc** (сгенерировано из **OpenAPI**)
-   Современная и с **умнейшими** типами
-   0 зависимостей
<!-- -   Берёт работу с [подписью запроса](https://www.tbank.ru/kassa/dev/payments/index.html#section/Podpis-zaprosa) на себя -->
-   [Есть на JSR](https://jsr.io/@kravets/elycart-api)

### Webhook

Пример использования webhook с фреймворком [Hono](https://hono.dev/)

```ts
import { Hono } from "hono";
import { Elycart, webhookHandler } from "elycart-api";

const elycart = new Elycart(process.env.TOKEN, process.env.SECRET_KEY);

elycart.on(({ data }) => {});

const app = new Hono();

app.get("/", webhookHandler(elycart, "hono"));
```

### Поддерживаемые webhook адаптеры

-   [Elysia](https://elysiajs.com/)
-   [Fastify](https://fastify.dev/)
-   [Hono](https://hono.dev/)
-   [Express](https://expressjs.com/)
-   [Koa](https://koajs.com/)
-   [node:http](https://nodejs.org/api/http.html)
-   [Bun.serve](https://bun.sh/docs/api/http)
-   [std/http (Deno.serve)](https://docs.deno.com/runtime/manual/runtime/http_server_apis#http-server-apis)

или любой другой фреймворк

```ts
// a non-existing framework for the example
import { App } from "some-http-framework";
import { Elycart } from "elycart-api";

const elycart = new Elycart(process.env.TOKEN, process.env.SECRET_KEY);

const app = new App().post("/t-kassa", async (req) => {
    // req.body must be json equivalent to Webhook notification body
    await elycart.emit(req.body);
});

app.listen(80);
```
