import { useTheme } from "../contexts/Theme.context";
import Button from "./Button";

export default function NotFound() {
  const { darkMode } = useTheme();
  return (
    <div className="items-center justify-center flex flex-col gap-2">
      <img
        src={darkMode ? "notfoundDark.svg" : "notfound.svg"}
        width={768}
        height={512}
        className="object-cover w-full lg:w-[512px]"
      />
      <h1 className="font-prompt text-2xl">
        A página requisitada não foi encontrada.
      </h1>
      <Button variant="outline">
        <a href="/">Voltar ao início</a>
      </Button>
    </div>
  );
}
