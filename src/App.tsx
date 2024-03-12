import Browser from "./components/Browser";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex justify-center">
          <span className="py-1 px-3 rounded-lg bg-purple dark:bg-green">
            <h4 className="text-sm lg:text-base font-medium font-poppins uppercase text-white dark:text-black">
              Bem vindo ao iParque
            </h4>
          </span>
        </div>
        <span className="font-prompt text-5xl lg:text-6xl lg:space-y-4 lg:text-center">
          <h1 className="text-black dark:text-white">
            Seu guia de eventos em parques:
          </h1>
          <h1 className="text-purple dark:text-green">
            Descubra, Participe e Crie!
          </h1>
        </span>
        <h4 className="text-base lg:text-center text-black dark:text-white font-poppins font-medium">
          Com o iParque, você tem o poder de explorar eventos locais ou mesmo
          criar o seu próprio, tudo isso em um ambiente amigável e acolhedor.
        </h4>
        <div className="flex justify-center">
          <Browser />
        </div>
      </section>
      <section className="mt-3 flex flex-col gap-3 lg:gap-5">
        <div className="lg:flex items-center justify-between pt-5">
          <div className="lg:w-1/2">
            <div className="font-prompt text-3xl">
              <h1 className="text-black dark:text-white">
                Aproveite a natureza ao
                <span className="text-purple dark:text-green"> máximo</span>
              </h1>
            </div>
            <h4 className="dark:text-white text-base front-medium font-poppins">
              Com o iParqe, nunca foi tão fácil encontrar e participar de
              eventos empolgantes nos parques próximos a você. De festivais
              culturais a sessões de ioga matinais, passeios de bicicleta e
              aulas de arte ao ar livre, nossa plataforma oferece uma ampla gama
              de atividades para todos os gostos e idades. Explore nosso
              calendário de eventos e descubra novas experiências que irão
              enriquecer sua vida e criar memórias duradouras.
            </h4>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={"/ilustr.svg"}
              alt="Ilustração mulher indo ao parque"
              width={512}
              height={512}
            />
          </div>
        </div>
      </section>
    </>
  );
}
