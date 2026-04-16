export interface RegistrationData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ResponseData {
  status: number;
  message: string;
}

export interface LoginResponseData extends ResponseData {
  data: {
    token: string;
  };
}
