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

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: string;
}

export interface Transaction {
  invoice_number: string;
  total_amount: number;
  transaction_type: "topup" | "payment";
  description: string;
  created_on: string;
}
