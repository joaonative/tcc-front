import { useState } from "react";
import Button from "../components/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;

    try {
      const response = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        alert("Email enviado com sucesso!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Erro ao enviar o email. Por favor, tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  };
  return (
    <section className="flex flex-col gap-5 items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-8 lg:p-12 bg-dark rounded-2xl max-w-[768px]"
      >
        <h1 className="font-prompt text-3xl lg:text-5xl text-center text-purple dark:text-green">
          Envie uma mensagem!
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block">
            Nome
          </label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="block">
            Mensagem
          </label>
          <textarea
            autoComplete="off"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border-[3px] border-purple dark:border-green rounded-lg px-3 py-2 h-24 bg-transparent resize-none focus:outline-none"
            required
          ></textarea>
        </div>
        <Button variant="primary" full submit>
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default Contact;
