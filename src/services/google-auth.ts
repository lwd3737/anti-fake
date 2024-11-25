import loadConfig, { Config } from "@/config";
import { generateCsrfToken } from "@/utils/csrf";
import { google, Auth } from "googleapis";
import { NextRequest } from "next/server";

export default class GoogleAuth {
	private _client: Auth.OAuth2Client;
	private _csrfToken?: string;

	public static parseAccessToken(req: NextRequest): string | undefined {
		const cookie = req.cookies.get("access-token");
		return cookie?.value;
	}

	public static create(accessToken?: string): GoogleAuth {
		const config = loadConfig();
		const { clientId, clientSecret, redirectUrl } = config.google;

		const auth = new GoogleAuth({ clientId, clientSecret, redirectUrl });

		if (accessToken) auth._client.setCredentials({ access_token: accessToken });

		return auth;
	}

	constructor(
		config: Pick<Config["google"], "clientId" | "clientSecret" | "redirectUrl">,
	) {
		const { clientId, clientSecret, redirectUrl } = config;

		this._client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
	}

	public get client(): Auth.OAuth2Client {
		return this._client;
	}

	public get csrfToken(): string | undefined {
		return this._csrfToken;
	}

	public generateAuthUrl(options: Auth.GenerateAuthUrlOpts): string {
		const csrfToken = generateCsrfToken();
		this._csrfToken = csrfToken;
		return this._client.generateAuthUrl({ state: csrfToken, ...options });
	}

	public generateAuthUrlWithYoutubeScope(): string {
		return this.generateAuthUrl({
			scope: [
				"https://www.googleapis.com/auth/youtube.force-ssl",
				"https://www.googleapis.com/auth/youtubepartner",
			],
		});
	}

	public async getToken(code: string): Promise<Auth.Credentials> {
		const { tokens, res } = await this._client.getToken(code);
		if (res!.status >= 400) {
			throw new Error(`Failed to get token: ${res!.statusText}`);
		}

		this._client.setCredentials(tokens);
		return tokens;
	}

	public async verifyAccessToken(accessToken: string): Promise<boolean> {
		try {
			const res = await this._client.getTokenInfo(accessToken);
			return res.expiry_date > Date.now();
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
