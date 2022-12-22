import React from 'react';
import Header from "../components/Header";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
  = ({
      children,
      title,
      description,
      keywords
    }) => {
  return (
    <>
      <Head>
          <meta charSet="utf-8"/>
          <meta name="description" content={`Recipes is here to help you cook delicious meals with less stress and more joy. ` + description}/>
          <title>{title || 'Recipe book'}</title>
          <meta name="keywords" content={keywords || "Recipes, food, cook"}/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {children}
    </>
  );
};

export default MainLayout;
