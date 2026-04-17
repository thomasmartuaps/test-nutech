const token = {
  get() {
    const data =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
