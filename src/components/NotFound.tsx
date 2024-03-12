export default function NotFound() {
  return (
    <div className="h-[512px] mt-12 items-center justify-center flex flex-col gap-5 dark:text-white">
      <h1>Página não encontrada, por favor retorne</h1>
      <a
        href="/"
        className="text-white dark:text-black bg-purple dark:bg-green px-3 py-1 rounded-lg font-poppins font-medium text-base uppercase"
      >
        Retorne ao Início
      </a>
    </div>
  );
}
