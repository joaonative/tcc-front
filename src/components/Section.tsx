import React from "react";

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="font-prompt lg:mt-6 pb-12 lg:pb-0">
      <h1 className="text-2xl lg:text-3xl mb-4">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
