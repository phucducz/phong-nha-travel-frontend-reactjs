import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { publicRoutes } from '~/routes';
import { DefaultLayout } from "./layout";
import { Fragment } from "react";
import "~/FontAwesome/FontAwesome.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            const Page = route.component;

            if (route.layout)
              Layout = route.layout;
            else if (route.layout === null)
              Layout = Fragment;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
            );
          })};
        </Routes>
      </div>
    </Router>
  )
}

export default App;
