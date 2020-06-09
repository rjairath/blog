// @flow strict
import React from "react";
import { useTagsList } from "../../../hooks";
import kebabCase from "lodash/kebabCase";
import { Link } from "gatsby";
import styles from "./TagsList.module.scss";

const TagsList = () => {
  const tags = useTagsList();
  return (
    <div className={styles["tags"]}>
      <ul className={styles["tags__list"]}>
        {tags.map((tag) => (
          <li key={tag.fieldValue} className={styles["tags__item"]}>
            <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsList;
