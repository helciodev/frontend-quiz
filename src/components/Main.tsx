import { ReactNode } from "react";

type MainProps = {
  children: ReactNode[] | null;
};

function Main({ children }: MainProps) {
  return <div>{children}</div>;
}

export default Main;
