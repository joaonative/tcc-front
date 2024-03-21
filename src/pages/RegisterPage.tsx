import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Section from "../components/Section";
import Button from "../components/Button";

export default function RegisterPage() {
  const { register, error } = useAuth();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [phone, setPhone] = useState<string>("");

  const [agreement, setAgreement] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");

  const [clientError, setClientError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setClientError("");

    if (!email || !password || !name || !age || !phone || !passwordC) {
      setClientError("preencha todos os campos");
      return;
    }

    if (password !== passwordC) {
      setClientError("as senhas não coincidem");
      return;
    }

    if (/\d/.test(name)) {
      setClientError("formato de nome inválido");
      return;
    }

    if (age > 100 || age < 18) {
      setClientError("formato de idade inválido");
      return;
    }

    if (!agreement) {
      setClientError("é necessário concordar com nossos termos");
      return;
    }

    register(email, password, name, phone, age);
  };
  return (
    <>
      <Section title="">
        <div className="flex flex-col justify-center md:px-52 lg:px-96">
          <div className="flex flex-col gap-6 bg-lightGray dark:bg-dark px-5 py-4 lg:py-5 lg:px-10 rounded-xl lg:rounded-3xl">
            <h1 className="text-3xl text-center lg:text-5xl font-prompt text-purple dark:text-green">
              Bem-vindo!
            </h1>
            {clientError && (
              <div className="text-center text-red-500 uppercase">
                <p>{clientError}</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 uppercase">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-5">
                <div className="flex flex-col">
                  <label htmlFor="email">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Idade</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={(e) => {
                      setAge(parseInt(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    const formattedPhone = value.replace(
                      /(\d{2})(\d{5})(\d{4})/,
                      "($1) $2-$3"
                    );
                    setPhone(formattedPhone);
                  }}
                />
              </div>
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
              <div className="flex items-center justify-between gap-5">
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
                <div className="flex flex-col">
                  <label htmlFor="email">Confirmar Senha</label>
                  <input
                    type="password"
                    name="passwordC"
                    value={passwordC}
                    onChange={(e) => {
                      setPasswordC(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button submit full variant="primary">
                  Cadastrar-se
                </Button>
                <Button full variant="google" onClick={() => {}}>
                  <img src="google.svg" width={24} height={24}></img>
                  Continue com o google
                </Button>
              </div>
              <div className="flex flex-col lg:flex-row gap-3 items-center lg:justify-between text-black/80 dark:text-white/80 font-poppins font-medium lg:text-base text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    className="h-4 w-4"
                    checked={agreement}
                    onChange={(e) => {
                      setAgreement(e.target.checked);
                    }}
                  />
                  <span>
                    Concordo com os{" "}
                    <a href="/" className="underline">
                      Termos de Uso
                    </a>
                  </span>
                </span>
                <a href="/entre">Já tem uma conta?</a>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
