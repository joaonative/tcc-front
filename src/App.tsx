import Button from "./components/Button";
import { Link } from "react-router-dom";
import Page from "./components/Page";

export default function Home() {
  return (
    <Page>
      <section className="flex flex-col xl:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 pb-5">
          <span className="font-prompt text-5xl lg:text-6xl lg:space-y-4">
            <h1 className="text-black dark:text-white">
              Seu guia de eventos em parques: <br />
              <span className="text-purple dark:text-green">
                Descubra, Participe e Crie!
              </span>
            </h1>
          </span>
          <h2 className="text-xl text-black dark:text-white font-poppins font-medium">
            Com o iParque, você tem o poder de explorar eventos locais ou mesmo
            criar o seu próprio, tudo isso em um ambiente amigável e acolhedor.
          </h2>
          <div className="flex items-center gap-5">
            <Link to={"/eventos"} className="w-max">
              <Button variant="primary">Começar Agora</Button>
            </Link>
            <Link to={"/eventos"} className="w-max">
              <Button variant="outline">Repositório GitHub</Button>
            </Link>
          </div>
        </div>

        <img
          src="hero.png"
          className="scale-x-[-1] lg:h-[512px] 3xl:h-[622px] hero bg-purple dark:bg-green "
        />
      </section>
    </Page>
  );
}
