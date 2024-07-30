import { createHmac } from "node:crypto";

export function generateSignature(
	secretKey: string,
	body: Record<string, unknown>,
) {
	return createHmac("sha256", secretKey)
		.update(JSON.stringify(body))
		.digest("hex");
}
