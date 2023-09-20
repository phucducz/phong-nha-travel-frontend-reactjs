import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from '~/routes';
import { Fragment } from "react";

import { DefaultLayout } from "./layouts";
import { MessageProvider } from "./context/Message";
import { AdminProvider } from "./context/Admin";
import Admin from "./pages/Admin";

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
                    {route.component === Admin
                      ? <AdminProvider>
                        <MessageProvider>
                          <Page />
                        </MessageProvider>
                      </AdminProvider>
                      : <Page />
                    }
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
