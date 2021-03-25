import React from "react";
import { BanTable } from "./component/BanTable";
import "./banpage.css";
import Header from "./Header/header";

function BanPage() {
  return (
    <div>
      <Header />
      <div className="table">
        <BanTable />
      </div>
    </div>
  );
}

export default BanPage;
