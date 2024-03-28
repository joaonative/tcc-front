import Button from "./Button";

export default function NotFound() {
  return (
    <div className="items-center justify-center flex flex-col gap-5">
      <h1>Página não encontrada.</h1>
      <Button variant="outline">
        <a href="/">Voltar ao início</a>
      </Button>
    </div>
  );
}
