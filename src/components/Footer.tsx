const Footer = () => {
  return (
    <footer className="hidden bottom-0 w-full lg:flex flex-col gap-4 bg-lightGray dark:bg-dark dark:text-white px-20 py-2">
      <div className="flex items-center justify-between text-sm font-poppins font-medium">
        <a href="/" target="blank" className="w-40 text-center">
          Contato
        </a>
        <a
          href="https://github.com/joaonative/tcc-front"
          target="blank"
          className="w-40 text-center"
        >
          GitHub
        </a>
        <img src={"/logo.svg"} alt="iParque logo" width={32} height={32} />
        <a href="/" target="blank" className="w-40 text-center">
          Termos de Uso
        </a>
        <a href="/" target="blank" className="w-40 text-center">
          Documentação
        </a>
      </div>
    </footer>
  );
};

export default Footer;
