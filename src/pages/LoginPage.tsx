import { useState } from "react";
import Button from "../components/Button";
import Section from "../components/Section";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, error } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login(email, password);
  };

  return (
    <>
      <Section title="">
        <div className="flex flex-col justify-center md:px-52 lg:px-96">
          <div className="flex flex-col gap-6 bg-lightGray dark:bg-dark px-5 py-4 lg:py-5 lg:px-10 rounded-xl lg:rounded-3xl">
            <h1 className="text-3xl text-center lg:text-5xl font-prompt text-purple dark:text-green">
              Bem-vindo de volta!
            </h1>
            {error && (
              <div className="text-center text-red-500 uppercase">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              <div className="flex flex-col gap-3">
                <Button submit full variant="primary">
                  Entrar
                </Button>
                <Button full variant="google" onClick={() => {}}>
                  <img src="google.svg" width={24} height={24}></img>
                  Continue com o google
                </Button>
              </div>
              <div className="flex flex-col lg:flex-row gap-3 items-center lg:justify-between text-black/80 dark:text-white/80 font-poppins font-medium lg:text-base text-sm">
                <a href="/">Esqueceu a senha?</a>
                <a href="/cadastro">Não tem uma conta?</a>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
