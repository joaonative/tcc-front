import React, { useEffect, useState } from "react";

import { createUser } from "../api/User";
import { useAuth } from "../contexts/Auth.context";
import { useError } from "../contexts/Error.context";
import Button from "../components/Button";

const Register = () => {
  const { setAuthenticated, setUser } = useAuth();
  const { setError } = useError();

  useEffect(() => {
    setAuthenticated(false);
    window.localStorage.removeItem("user");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    phone: "",
    passwordC: "",
  });

  const [agreement, setAgreement] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let fieldValue = value;

    if (name === "name") {
      fieldValue = fieldValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    if (name === "age") {
      fieldValue = fieldValue.replace(/\D/g, "");

      if (fieldValue.length > 2) {
        fieldValue = fieldValue.slice(0, 2);
      }

      const ageValue = parseInt(fieldValue);
      if (isNaN(ageValue)) {
        fieldValue = "";
      } else {
        fieldValue = ageValue.toString();
      }
    }

    if (name === "phone") {
      fieldValue = fieldValue.replace(/\D/g, "");

      if (fieldValue.length > 11) {
        fieldValue = fieldValue.slice(0, 10);
      }

      if (fieldValue.length > 2) {
        fieldValue = `(${fieldValue.slice(0, 2)}) ${fieldValue.slice(2)}`;
      }
      if (fieldValue.length > 8) {
        fieldValue = `${fieldValue.slice(0, 9)}-${fieldValue.slice(9)}`;
      }
    }

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.age ||
      !formData.phone
    ) {
      setError("preencha todos os campos");
      return;
    }

    if (formData.password.length < 8) {
      setError("senha precisa de no mínimo 8 caracteres");
      return;
    }

    if (formData.password !== formData.passwordC) {
      setError("as senhas não coincidem");
      return;
    }

    const ageValue = parseInt(formData.age);
    if (isNaN(ageValue)) {
      setError("idade inválida");
      return;
    }

    if (!agreement) {
      setError("você precisa concordar com nossos termos de uso");
    }

    await createUser(
      formData.email,
      formData.password,
      formData.name,
      ageValue,
      formData.phone,
      { setAuthenticated, setUser },
      { setError }
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 items-center p-8 lg:p-12 bg-lightGray dark:bg-dark rounded-2xl w-full lg:w-max">
          <h1 className="font-prompt text-5xl text-purple dark:text-green">
            Bem-vindo!
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label>Nome:</label>
                <input
                  autoComplete="off"
                  className="form"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Idade</label>
                <input
                  autoComplete="off"
                  className="form"
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Telefone</label>
              <input
                autoComplete="off"
                className="form"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
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
            <div className="flex lg:flex-row flex-col gap-5">
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
              <div className="flex flex-col gap-2">
                <label>Confirmar Senha:</label>
                <input
                  autoComplete="off"
                  className="form"
                  type="password"
                  name="passwordC"
                  value={formData.passwordC}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-1 font-prompt text-sm">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={agreement}
                  onClick={() => setAgreement(!agreement)}
                  className="h-4 w-4"
                />
                Concordo com os
                <a href="/" className="underline">
                  Termos de uso
                </a>
              </div>
              <a href="/entre">Já tem uma conta?</a>
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

export default Register;
