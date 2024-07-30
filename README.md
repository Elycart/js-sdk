# Elycart SDK для TypeScript/JavaScript

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

### Webhook

Пример использования webhook с фреймворком [Hono](https://hono.dev/)

```ts
import { Hono } from "hono";
import { TKassa, webhookHandler, filters } from "t-kassa-api";

const elycart = new Elycart(process.env.TOKEN, process.env.SECRET_KEY);

elycart.on((context) => {});

const app = new Hono();

app.get("/", webhookHandler(elycart, "hono"));
```
