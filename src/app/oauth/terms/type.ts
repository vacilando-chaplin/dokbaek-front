export interface TermsType {
  id: number;
  text: string;
  agreed: boolean;
  required: boolean;
}

export interface TermsMutationParams {
  state: string;
  domain: string;
  tempCode: string;
  termAgreements: {
    termId: number;
    agreed: boolean;
  }[];
}

export interface TermsMutationResult {
  token: {
    jwt: string;
    refreshToken: string;
  };
  state: string;
}
