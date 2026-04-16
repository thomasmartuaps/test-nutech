// function token() {
//   const get = localStorage.getItem("token");
//   function save(token: string) {
//     localStorage.setItem("token", token);
//   }
//   return {
//     get,
//     save,
//   };
// }

const token = {
  get() {
    return localStorage.getItem("token");
  },
  save(token: string) {
    localStorage.setItem("token", token);
  },
};

export default token;
