import { v4 as uuidv4 } from "uuid";

export function generateCsrfToken(): string {
	return uuidv4();
}
