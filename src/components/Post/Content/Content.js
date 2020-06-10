// @flow strict
import React from "react";
import styles from "./Content.module.scss";
import Meta from "../Meta";
import Tags from "../Tags";

type Props = {
  body: string,
  title: string,
  date: string,
  tags?: string[],
  tagSlugs?: string[],
};

const Content = ({ body, title, date, tags, tagSlugs }: Props) => (
  <div className={styles["content"]}>
    <h1 className={styles["content__title"]}>{title}</h1>
    <div className={styles["content__meta"]}>
      <Meta date={date} />
      {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
    </div>

    <div
      className={styles["content__body"]}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Content;
