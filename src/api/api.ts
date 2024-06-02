import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

let logoutFunction: (() => void) | undefined;
let setErrorFunction: ((error: string) => void) | undefined;

export const configureInterceptorFunctions = (
  logout: () => void,
  setError: (error: string) => void
) => {
  logoutFunction = logout;
  setErrorFunction = setError;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (logoutFunction) {
        logoutFunction();
      }
      if (setErrorFunction) {
        setErrorFunction("erro de autenticação, faça login");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
