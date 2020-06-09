// @flow strict
import React from "react";
import styles from "./Footer.module.scss";
import { useSiteMetadata } from "../../hooks";
import Contacts from "../Sidebar/Contacts";
import { Link } from "gatsby";

const Footer = () => {
  const { author } = useSiteMetadata();
  return (
    <div className={styles.footer}>
      <Contacts contacts={author.contacts} />
    </div>
  );
};

export default Footer;
