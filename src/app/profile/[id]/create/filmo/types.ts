export interface FilmoInputType {
  classification: string;
  production: string;
  title: string;
  cast: string;
  castInput: string;
  casting: string;
  description: string;
  link: string;
  thumbnail: string;
  representative: boolean;
  id: number;
  displayOrder: number;
}

export interface FilmoActiveType {
  classification: boolean;
  production: boolean;
  cast: boolean;
}

export interface FilmoModalType {
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
}

export interface FilmoDeleteModalType {
  id: number;
  active: boolean;
}
