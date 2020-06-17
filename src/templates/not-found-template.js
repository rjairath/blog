// @flow strict
import React from "react";
import { Sidebar, SidebarMobile } from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Header />
      <Sidebar />
      <Page title="NOT FOUND">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
      <SidebarMobile />
      <Footer />
    </Layout>
  );
};

export default NotFoundTemplate;
