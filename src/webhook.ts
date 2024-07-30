import type { Buffer } from "node:buffer";
import type { Elycart } from "./index";
import type { MaybePromise, WebhookBody } from "./types";

const responseOK = new Response("OK");
const SIGNATURE_HEADER_NAME = "x-signature";

interface FrameworkHandler {
	body: MaybePromise<WebhookBody>;
	response?: () => unknown;
	signature: string;
}

type FrameworkAdapter = (...args: any[]) => FrameworkHandler;

// !Temporally fix slow types on JSR
const frameworks: Record<
	| "http"
	| "std/http"
	| "Bun.serve"
	| "elysia"
	| "fastify"
	| "hono"
	| "express"
	| "koa",
	FrameworkAdapter
> = {
	elysia: ({ body, headers }) => ({
		body,
		response: () => responseOK,
		signature: headers[SIGNATURE_HEADER_NAME],
	}),
	fastify: (request, reply) => ({
		body: request.body,
		response: () => reply.send("OK"),
		signature: request.headers[SIGNATURE_HEADER_NAME],
	}),
	hono: (c) => ({
		body: c.req.json(),
		response: () => c.text("OK"),
		signature: c.req.header(SIGNATURE_HEADER_NAME),
	}),
	express: (req, res) => ({
		body: req.body,
		response: () => res.send("OK"),
		signature: req.header(SIGNATURE_HEADER_NAME),
	}),
	koa: (ctx) => ({
		body: ctx.request.body,
		response: () => {
			ctx.body = "OK";
		},
		signature: ctx.get(SIGNATURE_HEADER_NAME),
	}),
	http: (req, res) => ({
		body: new Promise((resolve) => {
			let body = "";

			req.on("data", (chunk: Buffer) => {
				body += chunk.toString();
			});

			req.on("end", () => resolve(JSON.parse(body)));
		}),
		response: () => res.writeHead(200).end("OK"),
		signature: req.headers[SIGNATURE_HEADER_NAME],
	}),
	"std/http": (req) => ({
		body: req.json(),
		response: () => responseOK,
		signature: req.headers.get(SIGNATURE_HEADER_NAME),
	}),
	"Bun.serve": (req) => ({
		body: req.json(),
		response: () => responseOK,
		signature: req.headers.get(SIGNATURE_HEADER_NAME),
	}),
} satisfies Record<string, FrameworkAdapter>;

/**
 * Функция, которая помогает зарегистрировать обработчик событий для подходящего вам фреймворка
 *
 * @example
 * ```ts
 * import { Hono } from "hono";
 * import { TKassa, webhookHandler } from "elycart-api";
 *
 * const elycart = new TKassa(process.env.TOKEN, process.env.SECRET_KEY);
 *
 * elycart.on(
 *     (context) => {
 *
 *     }
 * );
 *
 * const app = new Hono();
 *
 * app.get("/", webhookHandler(elycart, "hono"));
 * ```
 */
export function webhookHandler<Framework extends keyof typeof frameworks>(
	elycart: Elycart,
	framework: Framework,
) {
	const frameworkAdapter = frameworks[framework];

	return (async (...args: any[]) => {
		const { body, response, signature } = frameworkAdapter(...args);

		await elycart.emit(await body, signature);

		if (response) return response();
	}) as unknown as ReturnType<(typeof frameworks)[Framework]> extends {
		response: () => any;
	}
		? (
				...args: Parameters<(typeof frameworks)[Framework]>
			) => ReturnType<ReturnType<(typeof frameworks)[Framework]>["response"]>
		: (...args: Parameters<(typeof frameworks)[Framework]>) => void;
}
