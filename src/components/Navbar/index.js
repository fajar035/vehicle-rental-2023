import React, { useEffect } from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/icons/logo.svg";
import { Squash } from "hamburger-react";
import NavbarPublic from "./Public";
import NavbarPrivate from "./Private";
import { useState } from "react";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useSelector } from "react-redux";
import { Link, useResolvedPath } from "react-router-dom";

function Navbar() {
  const token = useSelector((state) => state.auth.userData.token);

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const resolvePath = useResolvedPath();
  const pathName = resolvePath.pathname;
  const type = pathName.includes("/vehicle-type");
  const typeReservation = pathName.includes("/reservation");

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <nav className={styles.nav}>
      <img src={logo} alt="logo" />

      <ul className={`${styles["menu"]} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link
            className={`${styles.link} ${
              pathName === "/" ? styles.active : ""
            }`}
            to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathName === "/vehicle-type" || type || typeReservation
                ? styles.active
                : ""
            }`}
            to="/vehicle-type">
            Vehicle type
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathName === "/history" ? styles.active : ""
            }`}
            to="/history">
            History
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathName === "/about" ? styles.active : ""
            }`}
            to="/about">
            About
          </Link>
        </li>
        {token ? <NavbarPrivate /> : <NavbarPublic />}
      </ul>

      {width <= 768 ? (
        <Squash toggled={isOpen} toggle={setIsOpen} color="#393939" />
      ) : null}
    </nav>
  );
}

export default Navbar;
