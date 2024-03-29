import React, { useEffect, useState } from "react";

import { login } from "../api/User";
import { useAuth } from "../contexts/Auth.context";
import { useError } from "../contexts/Error.context";
import Button from "../components/Button";

const Login = () => {
  const { setAuthenticated, setUser } = useAuth();
  const { setError, error } = useError();

  useEffect(() => {
    setAuthenticated(false);
    window.localStorage.removeItem("user");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("preencha todos os campos");
      return;
    }
    await login(
      formData.email,
      formData.password,
      { setAuthenticated, setUser },
      { setError }
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 items-center p-8 lg:p-12 bg-lightGray dark:bg-dark rounded-2xl w-full lg:w-max">
          <h1 className="font-prompt text-3xl lg:text-5xl text-purple dark:text-green">
            Bem-vindo de volta!
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">
            {error && (
              <p className="text-red-500 font-poppins font-medium uppercase text-center">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label>Email:</label>
              <input
                autoComplete="off"
                className="form"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Senha:</label>
              <input
                autoComplete="off"
                className="form"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-1 font-prompt text-sm">
              <a href="/">Esqueceu a senha?</a>
              <a href="/cadastro">Não tem uma conta?</a>
            </div>
            <Button variant="primary" full submit classes="mt-3">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
