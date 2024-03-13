import Button from "./Button";

export default function NotFound() {
  return (
    <div className="h-[512px] mt-12 items-center justify-center flex flex-col gap-5 dark:text-white">
      <h1>Página não encontrada :{"("}</h1>
      <Button variant="outline">
        <a href="/">Voltar ao início</a>
      </Button>
    </div>
  );
}
