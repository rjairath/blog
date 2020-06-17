// @flow strict
import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";
import { useSiteMetadata, useTagsList } from "../hooks";

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  let width = window.innerWidth;

  if (width > 685) {
    return (
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Header />
        <Sidebar />
        <Page title="Tags">
          <ul>
            {tags.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Page>
        <Footer />
      </Layout>
    );
  } else {
    return (
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Header />
        <Page title="Tags">
          <ul>
            {tags.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Page>
        <Sidebar />
        <Footer />
      </Layout>
    );
  }
};

export default TagsListTemplate;
