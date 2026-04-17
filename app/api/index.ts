import axios from "axios";
import type {
  Banner,
  ProfileData,
  RegistrationData,
  ResponseData,
  Service,
  Transaction,
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
  console.log("Attempting to log in with email:", email);
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

export async function topUp({
  token,
  amount,
}: {
  token: string;
  amount: number;
}) {
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
    `${API_BASE_URL}/banner`,
  );
  return res.data;
}

export async function getServices(token: string) {
  const res: { data: ResponseData<{ services: Service[] }> } = await axios.get(
    `${API_BASE_URL}/services`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function getTransactions({
  token,
  offset,
  limit,
}: {
  token: string;
  offset: number;
  limit: number;
}) {
  const res: { data: ResponseData<{ transactions: Transaction[] }> } =
    await axios.get(
      `${API_BASE_URL}/transaction/history?offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  return res.data;
}

export async function initiateTransaction({
  token,
  serviceCode,
}: {
  token: string;
  serviceCode: string;
}) {
  const res: { data: ResponseData<{ token: string }> } = await axios.post(
    `${API_BASE_URL}/transaction`,
    {
      service_code: serviceCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}
