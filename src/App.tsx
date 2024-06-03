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
              <Button variant="outline">GitHub</Button>
            </Link>
          </div>
        </div>
        <img
          loading="lazy"
          src="hero.webp"
          alt="fotografia de um homem sorrindo"
          className="shadow-2xl scale-x-[-1] lg:h-[512px] 3xl:h-[622px] hero bg-gradient-to-r from-fuchsia-600 to-purple dark:from-emerald-500 dark:to-green"
        />
      </section>

      <section className="flex flex-col lg:items-center gap-8">
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple dark:from-emerald-500 dark:to-green p-3 lg:p-5 rounded-xl">
          <img
            loading="lazy"
            src={darkMode ? "demoDark.webp" : "demo.webp"}
            className="object-cover bg-black rounded-xl h-[420px]"
            alt="exemplo interface do projeto iParque funcionando"
          />
        </div>
        <span className="lg:text-center lg:space-y-2">
          <h1 className="font-prompt text-3xl lg:text-4xl ">
            Encontre o Evento Perfeito
          </h1>
          <p className="text-xl text-black dark:text-white font-poppins font-medium">
            Explore a ampla seleção de eventos disponíveis na aba específica e
            encontre aquele que melhor se alinha com suas atividades.
            <br />
            Em seguida, participe da experiência com apenas alguns cliques!
          </p>
        </span>
        <Link to={"/eventos"} className="w-max">
          <Button variant="primary">Explorar Eventos Ativos</Button>
        </Link>
      </section>

      <section className="flex flex-col lg:items-center gap-8">
        <div className="flex lg:flex-row flex-col items-center lg:gap-32">
          <img
            loading="lazy"
            src="comm.webp"
            className="lg:h-96 comm bg-gradient-to-r from-fuchsia-600 to-purple dark:from-emerald-500 dark:to-green shadow-2xl"
            alt="fotografia de um grupo de pessoas que estao reunidas e felizes"
          />
          <div className="flex flex-col gap-5">
            <h1 className="font-prompt text-3xl lg:text-4xl ">
              Explore Comunidades
            </h1>
            <p className="text-xl text-black dark:text-white font-poppins font-medium">
              Navegue pela variedade de eventos personalizados para comunidades
              e encontre aquele que ecoa com a alma do seu grupo. Depois,
              mergulhe nessa experiência com apenas alguns cliques!
            </p>
            <Link to={"/comunidades"} className="w-max">
              <Button variant="primary">Descubra Comunidades</Button>
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
