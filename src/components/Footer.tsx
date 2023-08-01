import { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};
function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}

export default Footer;
