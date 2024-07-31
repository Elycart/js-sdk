import type { paths } from "./api-types";
import type { GetRequestBody, GetResponse, WebhookBody } from "./types";
import { generateSignature } from "./utils";

export class Elycart {
	token: string;
	secretKey: string | undefined;
	private listeners: ((context: WebhookBody) => unknown)[] = [];

	constructor(token: string, secretKey?: string) {
		this.token = token;
		this.secretKey = secretKey;
	}

	private async request(
		method: "GET" | "POST",
		path: string,
		data?: Record<string, unknown>,
	) {
		const options: RequestInit & {
			headers: Record<string, string>;
		} = {
			method,
			headers: {
				"user-agent":
					"Elycart SDK for Node.js (https://github.com/elycaty/js-sdk)",
			},
		};

		if (method === "POST" && data) {
			options.headers["content-type"] = "application/json";
			options.body = JSON.stringify(data);
		}

		const response = await fetch(`https://api.elycart.com${path}`, options);

		return response.json();
	}

	on<const Filter>(handler: (context: WebhookBody) => unknown) {
		if (!this.secretKey)
			throw new Error(
				"Чтобы принимать нотификацию вам необходимо передать secretKey вторым аргументом",
			);

		// if (!handler && typeof filtersOrHandler === "function")
		// 	// @ts-expect-error
		this.listeners.push(handler);

		// if (typeof handler === "function" && typeof filtersOrHandler === "function")
		// 	this.listeners.push(async (context, custom) => {
		// 		// @ts-expect-error
		// 		if ((await filters(context)) === true) return handler(context, custom);
		// 	});

		return this;
	}

	/**
	 * Рассказать о пришедшем событии
	 */
	async emit(data: WebhookBody, requestSignature: string) {
		if (!this.secretKey)
			throw new Error(
				"Чтобы принимать нотификацию вам необходимо передать secretKey вторым аргументом",
			);

		const signature = generateSignature(this.secretKey, data);
		if (signature !== requestSignature) throw Error("Токены не равны");

		for (const run of this.listeners) {
			await run(data); // custom
		}
	}

	/** @generated start-methods */
	/**
	 * Получение информации об определённом выставленном счёте
	 *
	 * @tags Merchant
	 *
	 *
	 * [Documentation](https://docs.elycart.com/#tag/merchant/GET/merchant/invoices/{invoiceId})
	 */
	getInvoice(
		/** Идентификатор выставленного счёта */ invoiceId: paths["/merchant/invoices/{invoiceId}"]["get"]["parameters"]["path"]["invoiceId"],
	): Promise<GetResponse<"/merchant/invoices/{invoiceId}", "get">> {
		return this.request("GET", `/merchant/invoices/${invoiceId}`);
	}
	/**
	 * Получение списка платежей
	 *
	 * @tags Merchant
	 *
	 *
	 * [Documentation](https://docs.elycart.com/#tag/merchant/GET/merchant/invoices/)
	 */
	getInvoices(): Promise<GetResponse<"/merchant/invoices/", "get">> {
		return this.request("GET", "/merchant/invoices/");
	}
	/**
	 * Выставление счёта
	 *
	 * @tags Merchant
	 *
	 *
	 * [Documentation](https://docs.elycart.com/#tag/merchant/POST/merchant/invoices/create)
	 */
	createInvoice(
		body: GetRequestBody<"/merchant/invoices/create", "post">,
	): Promise<GetResponse<"/merchant/invoices/create", "post">> {
		return this.request("POST", "/merchant/invoices/create", body);
	}
	/**
	 * Ручка для тестов вебхука. WIP
	 *
	 * @tags Merchant
	 *
	 * @deprecated
	 * [Documentation](https://docs.elycart.com/#tag/merchant/POST/merchant/resend-webhook/{invoiceId})
	 */
	testWebhook(
		/** Идентификатор выставленного счёта */ invoiceId: paths["/merchant/resend-webhook/{invoiceId}"]["post"]["parameters"]["path"]["invoiceId"],
	): Promise<GetResponse<"/merchant/resend-webhook/{invoiceId}", "post">> {
		return this.request("POST", `/merchant/resend-webhook/${invoiceId}`);
	}
	/** @generated stop-methods */
}
