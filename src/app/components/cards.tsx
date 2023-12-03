import React, { useState } from "react";
import Modal from "./modal";

const cards = [
    {
        title: "Card 1",
        description: "Description 1"
    },
    {
        title: "Card 2",
        description: "Description 2"
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
    function showModal() {
        console.log('open modal');
    }

    return cards.map((card, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl" id="card">
            <figure id="imagenCard"><img src="/images/camels.jpeg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick="showModal()">Ver más</button>
                    {/* <button className="btn btn-primary" onClick={this.openModal}>Ver más</button> */}
                </div>
            </div>
        </div>
    ));
};

export default Card;

/* "use client"
import React from "react";
import Modal from "./modal";

type CardProps = {
    title: string;
    description: string;
    modal: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ title, description, modal, onClick }: CardProps) => {
    function openModal() {
        console.log('open modal');
    }

    return (
        <div className="card bordered shadow-lg max-w-sm w-full rounded-lg overflow-hidden">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <button onClick={openModal} className="openModal">Ver más</button>
            </div>
        </div>
    );
}

export default Card; */

