const Footer = () => {
  return (
    <footer className="mt-12 fixed bottom-0 w-full flex flex-col gap-4 bg-lightGray dark:bg-dark dark:text-white px-5 lg:px-20 py-2">
      <div className="flex items-center justify-between text-xs lg:text-sm font-poppins font-medium">
        <img
          src={"/logo.svg"}
          alt="iParque logo"
          width={24}
          height={24}
          className="lg:hidden"
        />
        <a href="/" target="blank" className="lg:w-40 text-center">
          Contato
        </a>
        <a
          href="https://github.com/joaonative/tcc-front"
          target="blank"
          className="lg:w-40 text-center"
        >
          GitHub
        </a>
        <img
          src={"/logo.svg"}
          alt="iParque logo"
          width={32}
          height={32}
          className="hidden lg:block"
        />
        <a href="/" target="blank" className="lg:w-40 text-center">
          Termos de Uso
        </a>
        <a href="/" target="blank" className="lg:w-40 text-center">
          Documentação
        </a>
      </div>
    </footer>
  );
};

export default Footer;
