import type { Banner, Service } from "~/types";

export const mockService: Service[] = [
  {
    service_code: "PLN",
    service_name: "Listrik",
    service_icon: "",
    service_tarrif: "",
  },
  {
    service_code: "PULSA",
    service_name: "Pulsa",
    service_icon: "",
    service_tarrif: "",
  },
  {
    service_code: "PAKET_DATA",
    service_name: "Paket Data",
    service_icon: "",
    service_tarrif: "",
  },
  {
    service_code: "BPJS",
    service_name: "BPJS",
    service_icon: "",
    service_tarrif: "",
  },
  {
    service_code: "PDAM",
    service_name: "PDAM",
    service_icon: "",
    service_tarrif: "",
  },
];

export const mockPromo: Banner[] = [
  { banner_name: "Promo 1", banner_image: "", description: "" },
  { banner_name: "Promo 2", banner_image: "", description: "" },
  { banner_name: "Promo 3", banner_image: "", description: "" },
  { banner_name: "Promo 4", banner_image: "", description: "" },
  { banner_name: "Promo 5", banner_image: "", description: "" },
];
