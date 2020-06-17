// @flow strict
import React from "react";
import { Link } from "gatsby";
import Author from "./Author";
import Comments from "./Comments";
import Content from "./Content";
import Meta from "./Meta";
import Tags from "./Tags";
import styles from "./Post.module.scss";
import type { Node } from "../../types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Sidebar } from "../Sidebar/Sidebar";

type Props = {
  post: Node,
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles["post"]}>
      <Header />
      <div className={styles["post__content"]}>
        <Content
          body={html}
          title={title}
          date={date}
          tags={tags}
          tagSlugs={tagSlugs}
        />
      </div>

      {/* <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div> */}

      <Footer />

      {/* <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div> */}
    </div>
  );
};

export default Post;
