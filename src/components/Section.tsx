import React from "react";

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="font-prompt dark:text-white pb-16 lg:pb-24 lg:px-12 md:px-8 px-4 lg:mt-0 mt-24">
      <h1 className="text-2xl lg:text-3xl mb-4">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
