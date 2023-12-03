import React from "react";
import Banner from "../components/banner";
import Card from "../components/cards";
import Navbar from "../components/navbar";

import "./camels.css";

const camelOpportunities = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner />
            <div>
                <h1 className="text-3xl font-bold text-center mt-5">Oportunidades</h1>
            </div>
            <Card />
        </div>
    );
};

export default camelOpportunities;
