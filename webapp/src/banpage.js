import React from "react";
import { BanTable } from "./component/BanTable";
import "./banpage.css";
import Header from "./Header/header";

function BanPage() {
  return (
    <div className="table">
      <Header />
      <BanTable />
    </div>
  );
}

export default BanPage;
