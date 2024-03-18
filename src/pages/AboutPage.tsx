import Section from "../components/Section";
import DevCard from "../components/about/DevCard";

const AboutPage = () => {
  return (
    <>
      <Section title="Equipe de Desenvolvimento">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center justify-between gap-5 lg:gap-8 p-2">
          <DevCard
            imgUrl="https://avatars.githubusercontent.com/u/147207558?v=4"
            name="João V. de Matos"
            work="Frontend / Designer"
            email="jestudos127@gmail.com"
            gitHubLink="https://github.com/joaonative"
          />
          <DevCard
            imgUrl=""
            name="Guilherme Oliveira F."
            work="Backend"
            email=""
            gitHubLink=""
          />
          <DevCard
            imgUrl=""
            name="Carolina Cristina C."
            work="Backend"
            email=""
            gitHubLink=""
          />
          <DevCard
            imgUrl=""
            name="Júlia Orlandi de A."
            work="Banco de Dados"
            email=""
            gitHubLink=""
          />
          <DevCard
            imgUrl=""
            name="Nicolas Maisaishi Oi P."
            work="Documentação"
            email=""
            gitHubLink=""
          />
        </div>
      </Section>
      <Section title="Tecnologias Usadas">a</Section>
    </>
  );
};

export default AboutPage;
