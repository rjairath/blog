// @flow strict
import React from "react";
import styles from "./Header.module.scss";
import { useSiteMetadata } from "../../hooks";
import { Link } from "gatsby";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <span>
        <Link to="/">Blog Home</Link>
      </span>
      <span className={styles["header__right"]}>
        <a href="https://rishabhjairath.in/">About me</a>
      </span>
    </div>
  );
};

export default Header;
