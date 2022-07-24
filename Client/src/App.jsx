import React from "react";
import { Navbar } from "./components";
import { useRoutes } from "./hooks/routes.hook";

function App() {
  const user = {};
  const isAuthenticated = !!user.token;
  const routes = useRoutes(isAuthenticated);

  return (
    <div className="container">
      {isAuthenticated && <Navbar />}
      {routes}
    </div>
  );
}

export default App;
