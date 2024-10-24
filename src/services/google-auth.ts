import loadConfig, { Config } from "@/config";
import { generateCsrfToken } from "@/utils/csrf";
import { google, Auth } from "googleapis";

export default class GoogleAuth {
	private client: Auth.OAuth2Client;
	private _csrfToken?: string;

	public static create(accessToken?: string): GoogleAuth {
		const config = loadConfig();
		const { clientId, clientSecret, redirectUrl } = config.google;

		const auth = new GoogleAuth({ clientId, clientSecret, redirectUrl });

		if (accessToken) auth.client.setCredentials({ access_token: accessToken });

		return auth;
	}

	constructor(config: Omit<Config["google"], "apiKey">) {
		const { clientId, clientSecret, redirectUrl } = config;

		this.client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
	}

	public get csrfToken(): string | undefined {
		return this._csrfToken;
	}

	public generateAuthUrl(options: Auth.GenerateAuthUrlOpts): string {
		const csrfToken = generateCsrfToken();
		this._csrfToken = csrfToken;
		return this.client.generateAuthUrl({ state: csrfToken, ...options });
	}

	public generateAuthUrlWithYoutubeScope(): string {
		return this.generateAuthUrl({
			scope: ["https://www.googleapis.com/auth/youtube.force-ssl"],
		});
	}

	public async getToken(code: string): Promise<Auth.Credentials> {
		const { tokens, res } = await this.client.getToken(code);
		if (res!.status >= 400) {
			throw new Error(`Failed to get token: ${res!.statusText}`);
		}

		this.client.setCredentials(tokens);
		return tokens;
	}

	public async verifyAccessToken(accessToken: string): Promise<boolean> {
		try {
			const res = await this.client.getTokenInfo(accessToken);
			return res.expiry_date > Date.now();
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
