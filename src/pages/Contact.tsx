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
      return;
    }
  };
  return (
    <section className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="lg:space-y-8 space-y-4 p-8 lg:p-10 bg-lightGray dark:bg-dark rounded-2xl lg:w-max"
      >
        <h1 className="text-center lg:text-left font-prompt text-3xl lg:text-5xl lg:w-max">
          Deixe a sua mensagem!
        </h1>
        <div className="flex lg:flex-row flex-col items-center lg:gap-5 gap-1">
          <div className="flex flex-col lg:gap-2 gap-1 w-full">
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
          <div className="flex flex-col lg:gap-2 gap-1 w-full">
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
        </div>
        <div className="flex flex-col lg:gap-2 gap-1">
          <label htmlFor="message" className="block">
            Mensagem
          </label>
          <textarea
            autoComplete="off"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border-[3px] border-purple dark:border-green rounded-lg px-3 py-2 h-32 bg-transparent resize-none focus:outline-none"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" full submit>
            Enviar
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
