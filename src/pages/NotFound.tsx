import React from "react";
import Header from "../components/Header.tsx";
import NotFoundBlock from "../components/NotFoundBlock/index.tsx";

const NotFound: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <NotFoundBlock />
    </div>
  );
};

export default NotFound;
