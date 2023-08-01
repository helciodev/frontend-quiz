import { ReactNode } from "react";

type MainProps = {
  children: ReactNode[] | null | boolean;
};

function Main({ children }: MainProps) {
  return <div>{children}</div>;
}

export default Main;
