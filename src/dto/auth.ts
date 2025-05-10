// Request DTO
export interface VerifyTokenRequestDto {
  accessToken: string;
}

// Response DTO
export interface GenerateOauthUrlResponseDto {
  oauthUrl: string;
}

export interface VerifyTokenResponseDto {
  isVerified: boolean;
}

export interface GenerateTokenResponseDto {
  isAuthenticated: boolean;
}
