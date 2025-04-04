import { GaxiosError } from "gaxios";

export interface GoogleApisError extends GaxiosError {
	errors: GoogleApisErrorDetail[];
}

export interface GoogleApisErrorDetail {
	domain: string;
	reason: string;
	message: string;
	locationType: string;
	location: string;
}

export const isGoogleApisError = (error: any): error is GoogleApisError => {
	return error instanceof GaxiosError;
};
