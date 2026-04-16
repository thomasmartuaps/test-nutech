import axios from "axios";
import type { ProfileData, RegistrationData, ResponseData } from "~/types";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export async function registration({
  email,
  first_name,
  last_name,
  password,
}: RegistrationData) {
  const res: { data: ResponseData<null> } = await axios.post(
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
  const res: { data: ResponseData<{ token: string }> } = await axios.post(
    `${API_BASE_URL}/login`,
    {
      email,
      password,
    },
  );
  return res.data;
}

export async function getProfile(token: string) {
  const res: { data: ResponseData<ProfileData> } = await axios.get(
    `${API_BASE_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}
