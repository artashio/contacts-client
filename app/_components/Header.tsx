import React from "react";
import NavButton from "./NavButton";

type HeaderProps = {
  title: string;
  buttonPath: string;
  buttonCopy: string;
};

const Header = ({ title, buttonPath, buttonCopy }: HeaderProps) => (
  <header className="header-bar">
    <NavButton path="/" copy="Home" />
    <NavButton path={buttonPath} copy={buttonCopy} />
    <h2>{title}</h2>
  </header>
);

export default Header;