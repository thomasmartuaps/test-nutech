import axios from "axios";
import type {
  Banner,
  ProfileData,
  RegistrationData,
  ResponseData,
  Service,
} from "~/types";

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

export async function getBalance(token: string) {
  const res: { data: ResponseData<{ balance: number }> } = await axios.get(
    `${API_BASE_URL}/balance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function topUp(token: string, amount: number) {
  const res: { data: ResponseData<null> } = await axios.post(
    `${API_BASE_URL}/top-up`,
    {
      top_up_amount: amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function getBanners() {
  const res: { data: ResponseData<{ banners: Banner[] }> } = await axios.get(
    `${API_BASE_URL}/banners`,
  );
  return res.data;
}

export async function getServices() {
  const res: { data: ResponseData<{ services: Service[] }> } = await axios.get(
    `${API_BASE_URL}/services`,
  );
  return res.data;
}
