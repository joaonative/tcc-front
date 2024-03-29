import Section from "../components/Section";
import DevCard from "../components/about/DevCard";

const AboutPage = () => {
  return (
    <>
      <Section title="Equipe de Desenvolvimento">
        <div className="lg:grid flex items-center lg:overflow-auto overflow-x-scroll lg:grid-cols-5 gap-2 lg:gap-8 p-2">
          <DevCard
            imgUrl=""
            name="Carolina Cristina"
            work="Backend"
            email=""
            gitHubLink=""
          />
          <DevCard
            imgUrl="https://i.ibb.co/MPVmXSH/image.png"
            name="Guilherme Oliveira"
            work="Backend"
            email="gui.ferreira@gmail.com"
            gitHubLink="https://github.com/"
          />
          <DevCard
            imgUrl="https://avatars.githubusercontent.com/u/147207558?v=4"
            name="João Victor Matos"
            work="Frontend / Designer"
            email="jestudos127@gmail.com"
            gitHubLink="https://github.com/joaonative"
          />
          <DevCard
            imgUrl=""
            name="Júlia Orlandi"
            work="Banco de Dados"
            email=""
            gitHubLink=""
          />
          <DevCard
            imgUrl=""
            name="Nicolas Maisaishi"
            work="Documentação"
            email=""
            gitHubLink=""
          />
        </div>
      </Section>
      <Section title="Tecnologias de Desenvolvimento - Frontend">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              React
            </h1>
            <img
              src="/logos--react.svg"
              alt="ícone da tecnologia React"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              Vite
            </h1>
            <img
              src="/logos--vitejs.svg"
              alt="ícone da tecnologia Vite"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              Typescript
            </h1>
            <img
              src="/logos--typescript-icon.svg"
              alt="ícone da tecnologia Typescript"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              TailwindCSS
            </h1>
            <img
              src="/logos--tailwindcss-icon.svg"
              alt="ícone da tecnologia Figma"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
        </div>
      </Section>
      <Section title="Tecnologias de Desenvolvimento - Backend">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              Express
            </h1>
            <img
              src="/logos--express.svg"
              alt="ícone da tecnologia Express"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              Typescript
            </h1>
            <img
              src="/logos--typescript-icon.svg"
              alt="ícone da tecnologia Typescript"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              Postgresql
            </h1>
            <img
              src="/logos--postgresql.svg"
              alt="ícone da tecnologia Postgresql"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center p-5 rounded-2xl bg-lightGray dark:bg-dark">
            <h1 className="font-poppins font-medium text-base lg:text-xl">
              TypeORM
            </h1>
            <img
              src="/logos--typeorm.svg"
              alt="ícone da tecnologia TypeORM"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </div>
        </div>
      </Section>
      <div className="flex items-center justify-between">
        <img src="fiec-logo.webp" width={96} height={96} />
        <h1 className="font-poppins font-medium text-xl">
          Técnico informática para Internet FIEC @2024
        </h1>
      </div>
    </>
  );
};

export default AboutPage;
