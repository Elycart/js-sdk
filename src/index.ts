import type { paths } from "./api-types";
import type { GetRequestBody, GetResponse } from "./types";

export class Elycart {
	token: string;
	secretKey: string | undefined;

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

	/** @generated start-methods */
	/**
	 * Получение информации об определённом выставленном счёте
	 *
	 * @tags Merchant
	 *
	 *
	 * [Documentation](TODO://)
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
	 * [Documentation](TODO://)
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
	 * [Documentation](TODO://)
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
	 * [Documentation](TODO://)
	 */
	testWebhook(
		/** Идентификатор выставленного счёта */ invoiceId: paths["/merchant/resend-webhook/{invoiceId}"]["post"]["parameters"]["path"]["invoiceId"],
	): Promise<GetResponse<"/merchant/resend-webhook/{invoiceId}", "post">> {
		return this.request("POST", `/merchant/resend-webhook/${invoiceId}`);
	}
	/** @generated stop-methods */
}
