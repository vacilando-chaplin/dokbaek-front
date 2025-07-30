export interface KakaoDataType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface NaverDataType {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
}

export interface GoogleDataType {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
}

export interface OAuthMutationParams {
  domain: string;
  tempCode: string;
  state: string;
}

export interface OAuthMutationResult {
  token: {
    jwt: string;
    refreshToken: string;
  };
  state: string;
}
