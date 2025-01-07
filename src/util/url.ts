import loadConfig from "@/config";

export function generateServerUrl(pathname: string): string {
	const { baseUrl } = loadConfig();
	return `${baseUrl}${pathname}`;
}
