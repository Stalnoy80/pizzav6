import React from "react";
import "./scss/app.scss";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Home />
      </div>
    </div>
  );
};

export default App;
