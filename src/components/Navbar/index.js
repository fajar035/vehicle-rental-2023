import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/icons/logo.svg";
import { Squash } from "hamburger-react";
import NavbarPublic from "./Public";
import NavbarPrivate from "./Private";
import { useState } from "react";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useSelector } from "react-redux";

function Navbar() {
  const token = useSelector((state) => state.auth.userData.token);

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <nav className={styles.nav}>
      <img src={logo} alt="logo" />

      <ul className={`${styles["menu"]} ${isOpen ? styles.open : ""}`}>
        <li className={styles.active}>Home</li>
        <li>Vehicle Type</li>
        <li>History</li>
        <li>About</li>
        {token ? <NavbarPrivate /> : <NavbarPublic />}
      </ul>

      {width <= 768 ? (
        <Squash toggled={isOpen} toggle={setIsOpen} color="#393939" />
      ) : null}
    </nav>
  );
}

export default Navbar;
