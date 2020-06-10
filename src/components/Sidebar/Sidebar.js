// @flow strict
import React from "react";
import Author from "./Author";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";
import TagsList from "./TagsList";
import styles from "./Sidebar.module.scss";
import { useSiteMetadata } from "../../hooks";
import { useTagsList } from "../../hooks";

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__inner"]}>
        <Author author={author} isIndex={isIndex} />
        <TagsList tags={tags} />
        {/* <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
