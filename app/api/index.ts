import axios from "axios";
import type {
  LoginResponseData,
  RegistrationData,
  ResponseData,
} from "~/types";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export async function registration({
  email,
  first_name,
  last_name,
  password,
}: RegistrationData) {
  const res: { data: ResponseData } = await axios.post(
    `${API_BASE_URL}/registration`,
    {
      email,
      first_name,
      last_name,
      password,
    },
  );
  return res.data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res: { data: LoginResponseData } = await axios.post(
    `${API_BASE_URL}/login`,
    {
      email,
      password,
    },
  );
  return res.data;
}
