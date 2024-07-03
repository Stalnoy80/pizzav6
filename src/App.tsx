import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";

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
