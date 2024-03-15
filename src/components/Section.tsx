import React from "react";

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="dark:text-white font-prompt lg:mt-12 lg:pb-0 mt-24 pb-12">
      <h1 className="text-2xl lg:text-3xl ml-2 pb-4">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
