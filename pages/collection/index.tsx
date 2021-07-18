import { GetStaticPaths } from "next";
import React from "react";
import { CollectionList } from "~/components/CollectionList";
import { createGetStaticProps } from "~/utils/createGetStaticProps";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CollectionDetails } from "~/components/CollectionDetails";
export const getStaticProps = createGetStaticProps(["common"]);

const CollectionListPage = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/collection/:id">
          <CollectionDetails />
        </Route>
        <Route>
          <CollectionList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default CollectionListPage;
