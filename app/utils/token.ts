const token = {
  get() {
    const data =
      typeof window !== "undefined" ? localStorage.getItem("key") : null;
    return data;
  },
  save(token: string) {
    localStorage.setItem("token", token);
  },
  remove() {
    localStorage.removeItem("token");
  },
};

export default token;
