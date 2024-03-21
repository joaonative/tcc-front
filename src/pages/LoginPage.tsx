import { useState } from "react";
import Button from "../components/Button";
import Section from "../components/Section";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, logout } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Section title="">
        <div className="flex flex-col justify-center px-5 lg:px-[512px]">
          <div className="flex flex-col gap-12">
            <h1 className="text-2xl text-center lg:text-5xl font-prompt text-purple dark:text-green">
              Bem-vindo de volta!
            </h1>
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
              <div className="flex items-center justify-between text-black/80 dark:text-white/80 font-poppins font-medium lg:text-base text-sm">
                <a href="">Esqueceu a senha?</a>
                <a href="/cadastro">Não possui conta?</a>
              </div>
            </form>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  login(email, password);
                }}
                full
                variant="primary"
              >
                Entrar
              </Button>
              <Button
                full
                variant="google"
                onClick={() => {
                  logout();
                }}
              >
                <img src="google.svg" width={24} height={24}></img>
                Continue com o google
              </Button>
            </div>
          </div>
        </div>
        <Button
          full
          variant="google"
          onClick={() => {
            logout();
          }}
        >
          <img src="google.svg" width={24} height={24}></img>
          Sair
        </Button>
      </Section>
    </>
  );
}
