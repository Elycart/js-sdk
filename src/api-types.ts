/**
 * @module
 *
 * Сгенерированные TypeScript типы для [API Elycart](https://docs.elycart.com).
 */

/**
 * Сгенерированные из OpenAPI типы для `paths`
 */
export interface paths {
	"/merchant/invoices/{invoiceId}": {
		/** @description Получение информации об определённом выставленном счёте */
		get: operations["getInvoice"];
	};
	"/merchant/invoices/": {
		/** @description Получение списка платежей */
		get: operations["getInvoices"];
	};
	"/merchant/invoices/create": {
		/** @description Выставление счёта */
		post: operations["createInvoice"];
	};
	"/merchant/resend-webhook/{invoiceId}": {
		/**
		 * @deprecated
		 * @description Ручка для тестов вебхука. WIP
		 */
		post: operations["testWebhook"];
	};
}
/**
 * Сгенерированные из OpenAPI типы для `webhooks`
 */
export interface webhooks {
	"payment-data": {
		post: {
			/** @description Данные об успешной оплате */
			requestBody: {
				content: {
					"application/json": {
						/**
						 * @description Тип события
						 * @constant
						 */
						event: "payment-data";
						/** @description Идентификатор продавца */
						merchantId: number;
						/** @description Информация о платеже */
						data: {
							/**
							 * Format: uuid
							 * @description Идентификатор выставленного счёта
							 */
							id: string;
							/** @description Заголовок платежа */
							title: string;
							/** @description Никнейм пользователя */
							username: string;
							email?: null | Record<string, never> | string;
							comment?: null | Record<string, never> | string;
							/** @description Сумма платежа в рублях (float) */
							price: number;
							backURL?: null | Record<string, never> | string;
							successURL?: null | Record<string, never> | string;
							failureURL?: null | Record<string, never> | string;
							/** @description Состояние платежа */
							status: "created" | "waiting" | "finished" | "cancelled";
							/** @description Любая JSON сущность для передачи необходимых вам параметров */
							data: unknown;
						};
					};
				};
			};
			responses: {
				/** @description Ответ `OK` символизирует успешно обработанное событие */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						"application/json": "OK";
					};
				};
			};
		};
	};
}
/**
 * Сгенерированные из OpenAPI типы для `components`
 */
export interface components {
	schemas: {
		/** @description Информация о платеже */
		Invoice: {
			/**
			 * Format: uuid
			 * @description Идентификатор выставленного счёта
			 */
			id: string;
			/** @description Заголовок платежа */
			title: string;
			/** @description Никнейм пользователя */
			username: string;
			email?: null | Record<string, never> | string;
			comment?: null | Record<string, never> | string;
			/** @description Сумма платежа в рублях (float) */
			price: number;
			backURL?: null | Record<string, never> | string;
			successURL?: null | Record<string, never> | string;
			failureURL?: null | Record<string, never> | string;
			/** @description Состояние платежа */
			status: "created" | "waiting" | "finished" | "cancelled";
			/** @description Любая JSON сущность для передачи необходимых вам параметров */
			data: unknown;
		};
		/**
		 * Format: uuid
		 * @description Идентификатор выставленного счёта
		 */
		InvoiceId: string;
		/** @description Состояние платежа */
		InvoiceStatus: "created" | "waiting" | "finished" | "cancelled";
	};
}

/**
 * Сгенерированные из OpenAPI типы для `operations`
 */
export interface operations {
	getInvoice: {
		parameters: {
			path: {
				/** @description Идентификатор выставленного счёта */
				invoiceId: string;
			};
		};

		responses: {
			/** @description Информация о платеже */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					};
					"multipart/form-data": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					};
					"text/plain": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					};
				};
			};
			/**
			 * @description Платёж не найден
			 * @constant
			 */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": "Not Found";
					"multipart/form-data": "Not Found";
					"text/plain": "Not Found";
				};
			};
		};
	};
	getInvoices: {
		parameters: {
			query?: {
				page?: string | number;
				pageSize?: string | number;
				/** @description Состояние платежа */
				status?: "created" | "waiting" | "finished" | "cancelled";
			};
		};

		responses: {
			/** @description Список выставленных вами платежей */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					}[];
					"multipart/form-data": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					}[];
					"text/plain": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Заголовок платежа */
						title: string;
						/** @description Никнейм пользователя */
						username: string;
						email?: null | Record<string, never> | string;
						comment?: null | Record<string, never> | string;
						/** @description Сумма платежа в рублях (float) */
						price: number;
						backURL?: null | Record<string, never> | string;
						successURL?: null | Record<string, never> | string;
						failureURL?: null | Record<string, never> | string;
						/** @description Состояние платежа */
						status: "created" | "waiting" | "finished" | "cancelled";
						/** @description Любая JSON сущность для передачи необходимых вам параметров */
						data: unknown;
					}[];
				};
			};
		};
	};
	createInvoice: {
		requestBody: {
			content: {
				"application/json": {
					/** @description Заголовок платежа */
					title: string;
					/** @description Никнейм пользователя */
					username: string;
					email?: null | Record<string, never> | string;
					comment?: null | Record<string, never> | string;
					/** @description Сумма платежа в рублях (float) */
					price: number;
					backURL?: null | Record<string, never> | string;
					successURL?: null | Record<string, never> | string;
					failureURL?: null | Record<string, never> | string;
					/** @description Любая JSON сущность для передачи необходимых вам параметров */
					data: unknown;
				};
				"multipart/form-data": {
					/** @description Заголовок платежа */
					title: string;
					/** @description Никнейм пользователя */
					username: string;
					email?: null | Record<string, never> | string;
					comment?: null | Record<string, never> | string;
					/** @description Сумма платежа в рублях (float) */
					price: number;
					backURL?: null | Record<string, never> | string;
					successURL?: null | Record<string, never> | string;
					failureURL?: null | Record<string, never> | string;
					/** @description Любая JSON сущность для передачи необходимых вам параметров */
					data: unknown;
				};
				"text/plain": {
					/** @description Заголовок платежа */
					title: string;
					/** @description Никнейм пользователя */
					username: string;
					email?: null | Record<string, never> | string;
					comment?: null | Record<string, never> | string;
					/** @description Сумма платежа в рублях (float) */
					price: number;
					backURL?: null | Record<string, never> | string;
					successURL?: null | Record<string, never> | string;
					failureURL?: null | Record<string, never> | string;
					/** @description Любая JSON сущность для передачи необходимых вам параметров */
					data: unknown;
				};
			};
		};
		responses: {
			/** @description Платёж успешно выставлен. **url** содержит ссылку вида `https://pay.elycart.com/ИДЕНФТИФИКАТОР_ПЛАТЕЖА` */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Ссылка вида `https://pay.elycart.com/ИДЕНФТИФИКАТОР_ПЛАТЕЖА` */
						url: string;
					};
					"multipart/form-data": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Ссылка вида `https://pay.elycart.com/ИДЕНФТИФИКАТОР_ПЛАТЕЖА` */
						url: string;
					};
					"text/plain": {
						/**
						 * Format: uuid
						 * @description Идентификатор выставленного счёта
						 */
						id: string;
						/** @description Ссылка вида `https://pay.elycart.com/ИДЕНФТИФИКАТОР_ПЛАТЕЖА` */
						url: string;
					};
				};
			};
		};
	};
	testWebhook: {
		parameters: {
			path: {
				/** @description Идентификатор выставленного счёта */
				invoiceId: string;
			};
		};

		responses: {
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						ok: boolean;
					};
					"multipart/form-data": {
						ok: boolean;
					};
					"text/plain": {
						ok: boolean;
					};
				};
			};
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						general: string;
					};
					"multipart/form-data": {
						general: string;
					};
					"text/plain": {
						general: string;
					};
				};
			};
		};
	};
}
