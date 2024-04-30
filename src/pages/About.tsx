import { useRef } from "react";
import Dev from "../components/about/Dev";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const devs = [
    {
      name: "João Victor de Matos",
      email: "joao35434@fiec.edu.br",
      imageUrl: "https://avatars.githubusercontent.com/u/147207558?v=4",
      job: "Frontend",
      github: "https://github.com/joaonative",
      username: "joaonative",
    },
    {
      name: "Guilherme Oliveira Ferreira",
      email: "guilherme35525@fiec.edu.br",
      imageUrl: "https://avatars.githubusercontent.com/u/146398231?v=4",
      job: "Backend",
      github: "https://github.com/g-uizo",
      username: "g-uizo",
    },
    {
      name: "Carolina Cristina Campos",
      email: "carolina35420@fiec.edu.br",
      imageUrl: "https://avatars.githubusercontent.com/u/125034396?v=4",
      job: "Backend",
      github: "https://github.com/CCamposDEV23",
      username: "CCamposDEV23",
    },
    {
      name: "Juila Orlandi",
      email: "julia35436@fiec.edu.br",
      imageUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocJYRGQniHd_dnpI6AJXnC1A3DDFcWMfIj5BgLxTI-Htnnb5Vg=s512-c-mo",
      job: "Banco de dados",
      github: "",
      username: "",
    },
    {
      name: "Nicolas Masaishi",
      email: "nicolas35440@fiec.edu.br",
      imageUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjWISh1alOk1YIf7qppzK7l3WBETTFoj0Uke_oWVv2i4jth0y0E=s512-c",
      job: "Documentação",
      github: "",
      username: "",
    },
  ];
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-prompt">Sobre</h1>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-prompt">Como começou ?</h2>
            <blockquote className="font-xl font-poppins font-medium">
              Somos um projeto vinculado ao curso de Informática para Internet
              da Fundação Indaiatubana de Educação e Cultura (FIEC), tudo
              começou no ano de 2023, onde nós fomos introduzidos ao curso com a
              proposta de criar um projeto útil para por em prática nossos
              estudos durante todo o trajeto.
            </blockquote>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-prompt">O que é o iParque ?</h2>
            <blockquote className="font-xl font-poppins font-medium">
              O iParque é uma plataforma on-line criada com a finalidade de unir
              pessoas em eventos em parques, o principal parque do projeto é o
              Parque Ecológico da cidade de Indaiatuba. A plataforma permite o
              usuário participar de eventos, que são um post publicado por outro
              membro da plataforma, cada usuário também pode criar seu próprio
              evento e personalizá-lo da forma que quiser! O iParque oferece
              também Comunidades, grupos de pessoas que costumam fazer eventos
              juntos, cada comunidade tem um tema, além de regras específicas
              definidas pelo criador, cada usuário tem a opção de criar sua
              comunidade para unir seus amigos!
            </blockquote>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-prompt">Tecnologias Utilizadas</h2>
            <blockquote className="font-xl font-poppins font-medium">
              Para o desenvolvimento Frontend utilizamos: biblioteca ReactJS
              juntamente com o framework ViteJS para estrutura do cliente,
              framework TailwindCSS para estilização da página, biblioteca Axios
              para requisições HTTP, biblioteca TanstackQuery para gerenciamento
              de estados http, Cloud Firestore como banco de dados remoto para
              imagens e Vercel como plataforma de deploy do cliente em nuvem.
            </blockquote>
            <blockquote className="font-xl font-poppins font-medium">
              Para o desenvolvimento Backend utilizamos: framework Express
              juntamente com o ambiente NodeJS para estrutura do servidor, banco
              de dados noSQL MongoDB Cloud com a biblioteca Mongoose para
              gerenciamento do banco de dados, arquitetura de arquivos JSON para
              transmissão de dados entre o cliente/servidor e plataforma Render
              para deploy do servidor em nuvem.
            </blockquote>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-prompt">Equipe</h1>
        <ul
          ref={ref}
          className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-5"
        >
          {devs.map((dev, index) => (
            <motion.li
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.3 }}
              key={index}
            >
              <Dev
                github={dev.github}
                username={dev.username}
                name={dev.name}
                email={dev.email}
                imageUrl={dev.imageUrl}
                job={dev.job}
              />
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default About;
