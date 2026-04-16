export interface RegistrationData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ResponseData<T> {
  status: number;
  message: string;
  data: T;
}

export interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}
