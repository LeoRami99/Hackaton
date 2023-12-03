"use client";
import React, { useState } from "react";
// import Modal from "./modal";

const cards = [
    {
        title: "Card 1",
        description: "Description 1",
    },
    {
        title: "Card 2",
        description: "Description 2",
    },
    {
        title: "Card 3",
        description: "Description 3",
    },
    {
        title: "Card 4",
        description: "Description 4",
    },
    {
        title: "Card 5",
        description: "Description 5",
    },
    {
        title: "Card 6",
        description: "Description 6",
    },
    {
        title: "Card 7",
        description: "Description 5",
    },
    {
        title: "Card 8",
        description: "Description 6",
    },
];

const Card = () => {
    const showModal = (index: number) => {
        console.log(index + "open modal");
    };

    return cards.map((card, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl" id="card">
            <figure id="imagenCard">
                <img src="/images/camels.jpeg" alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => showModal(index)}>
                        Ver más
                    </button>
                    {/* <button className="btn btn-primary" onClick={this.openModal}>Ver más</button> */}
                </div>
            </div>
        </div>
    ));
};

export default Card;
