import Button from "./components/Button";
import { Link } from "react-router-dom";
import Page from "./components/Page";
import { useTheme } from "./contexts/Theme.context";

export default function Home() {
  const { darkMode } = useTheme();
  return (
    <Page>
      <section className="flex flex-col xl:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 pb-5">
          <span className="font-prompt text-5xl lg:text-6xl lg:space-y-4">
            <h1>
              Seu guia de eventos em parques: <br />
              <span className="text-purple dark:text-green">
                Descubra, Participe e Crie!
              </span>
            </h1>
          </span>
          <p className="text-xl text-black dark:text-white font-poppins font-medium">
            Com o iParque, você tem o poder de explorar eventos locais ou mesmo
            criar o seu próprio, tudo isso em um ambiente amigável e acolhedor.
          </p>
          <div className="flex items-center gap-5">
            <Link to={"/entre"} className="w-max">
              <Button variant="primary">Começar Agora</Button>
            </Link>
            <Link
              to={"https://github.com/joaonative/tcc-front"}
              className="w-max"
              target="_blank"
            >
              <Button variant="outline">Repositório GitHub</Button>
            </Link>
          </div>
        </div>

        <img
          src="hero.png"
          className="scale-x-[-1] lg:h-[512px] 3xl:h-[622px] hero bg-gradient-to-r from-fuchsia-600 to-purple dark:from-emerald-500 dark:to-green"
        />
      </section>
      <section className="flex flex-col items-center gap-4">
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple dark:from-emerald-500 dark:to-green p-5 rounded-xl">
          <img
            src={darkMode ? "demoDark.png" : "demo.png"}
            className="object-cover bg-black rounded-xl h-96"
          />
        </div>
        <span className="text-center lg:space-y-2">
          <h1 className="font-prompt text-3xl lg:text-4xl ">
            Encontre o Evento Perfeito
          </h1>
          <p className="text-xl text-black dark:text-white font-poppins font-medium">
            Explore a ampla seleção de eventos disponíveis na aba específica e
            encontre aquele que melhor se alinha com suas atividades. Em
            seguida, participe da experiência com apenas alguns cliques!
          </p>
        </span>
        <Link to={"/eventos"} className="w-max">
          <Button variant="primary">Explorar Eventos Ativos</Button>
        </Link>
      </section>
    </Page>
  );
}
