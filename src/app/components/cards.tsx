import React, { useState } from "react";
import Modal from "./modal";



const cards = [
    {
        title: "Card 1",
        description: "Description 1",
        onClick: () => {
            // Lógica para abrir el modal de la Card 1
        }
    },
    {
        title: "Card 2",
        description: "Description 2",
        onClick: () => {
            // Lógica para abrir el modal de la Card 2
        }
    },
    {
        title: "Card 3",
        description: "Description 3",
        onClick: () => {
            // Lógica para abrir el modal de la Card 3
        }
    }
];

const Card = () => {

    cards.onClick = () => {
        console.log('open modal');
    }
    return (
        <div>
            {cards.map((card, index) => (
                <div key={index} className="card bordered shadow-lg max-w-sm w-full rounded-lg overflow-hidden">
                    <div className="card-body">
                        <h2 className="card-title">{card.title}</h2>
                        <p>{card.description}</p>
                        <button onClick={card.onClick} className="openModal">Ver más</button>
                    </div>
                </div>
            ))}
        </div>
    );
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

