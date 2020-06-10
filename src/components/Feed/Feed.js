// @flow strict
import React from "react";
import moment from "moment";
import { Link } from "gatsby";
import type { Edges } from "../../types";
import styles from "./Feed.module.scss";
import Tags from "../Post/Tags";
type Props = {
  edges: Edges,
};

const Feed = ({ edges }: Props) => {
  console.log(edges);

  return (
    <div className={styles["feed"]}>
      {edges.map((edge) => (
        <div className={styles["feed__item"]} key={edge.node.fields.slug}>
          <div className={styles["feed__item-meta"]}>
            <time
              className={styles["feed__item-meta-time"]}
              dateTime={moment(edge.node.frontmatter.date).format(
                "MMMM D, YYYY"
              )}
            >
              {moment(edge.node.frontmatter.date).format("MMMM YYYY")}
            </time>
            <span className={styles["feed__item-meta-divider"]} />
            {/* use tags instead */}

            {edge.node.frontmatter.tags && edge.node.fields.tagSlugs && (
              <Tags
                tags={edge.node.frontmatter.tags}
                tagSlugs={edge.node.fields.tagSlugs}
              />
            )}
          </div>
          <h2 className={styles["feed__item-title"]}>
            <Link
              className={styles["feed__item-title-link"]}
              to={edge.node.fields.slug}
            >
              {edge.node.frontmatter.title}
            </Link>
          </h2>
          <p className={styles["feed__item-description"]}>
            {edge.node.frontmatter.description}
          </p>
          <Link
            className={styles["feed__item-readmore"]}
            to={edge.node.fields.slug}
          >
            Read
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
