import { ReactNode } from "react";

const Page = ({ children }: { children: ReactNode }) => {
  return <section className="flex flex-col gap-5">{children}</section>;
};

export default Page;
