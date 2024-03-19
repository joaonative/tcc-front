import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";

export default function RegisterPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubit = async () => {
    console.log(email, password);
  };
  return (
    <>
      <Section title="">
        <div className="flex flex-col justify-center px-5 lg:px-[512px]">
          <div className="flex flex-col gap-12">
            <h1 className="text-2xl text-center lg:text-5xl font-prompt text-purple dark:text-green">
              Bem-vindo ao iParque!
            </h1>
            <form onSubmit={handleSubit} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Senha</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-black/80 dark:text-white/80 font-poppins font-medium lg:text-base text-sm">
                <span className="flex items-center gap-1 lg:gap-2">
                  <input type="checkbox" className="h-5 w-5" />
                  Concordo com os
                  <a href="/" className="underline">
                    Termos de uso{" "}
                  </a>
                </span>
                <a href="/entre">Já tem uma conta?</a>
              </div>
            </form>
            <div className="flex flex-col gap-3">
              <Button submit full variant="primary">
                Cadastrar-se
              </Button>
              <Button
                full
                variant="google"
                onClick={() => {
                  login();
                }}
              >
                <img src="google.svg" width={24} height={24}></img>
                Cadastre-se com o google
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
