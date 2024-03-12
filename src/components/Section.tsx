import React from "react";

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="dark:text-white font-prompt mt-12">
      <h1 className="text-2xl lg:text-3xl pb-4">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
