import type { paths, webhooks } from "./api-types";

export type GetRequestBody<
	Path extends keyof paths,
	Method extends "get" | "post",
	// TerminalKey extends string = "",
	// ContentType extends string = "application/json",
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends { requestBody?: { content: any } }
		? NonNullable<
				paths[Path][Method]["requestBody"]
			>["content"]["application/json"]
		: never
	: never;

export type GetResponse<
	Path extends keyof paths,
	Method extends "get" | "post",
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends {
			responses: {
				200: {
					content: {
						"application/json": any;
					};
				};
			};
		}
		? paths[Path][Method]["responses"][200]["content"]["application/json"]
		: never
	: never;

export type MaybePromise<T> = Promise<T> | T;

export type WebhookBody =
	webhooks["payment-data"]["post"]["requestBody"]["content"]["application/json"];
