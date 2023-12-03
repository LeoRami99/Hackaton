"use client";
import React, { useState } from "react";
import Modal from "./modal";

const cards = [
    {
        title: "Desarrollador Full Stack",
        description: "Responsable de trabajar en todas las capas de desarrollo de software, combinando habilidades de front-end y back-end.",
    },
    {
        title: "Desarrollador Frontend",
        description: "Enfocado en la construcción de interfaces de usuario atractivas y eficientes, utilizando tecnologías web modernas.",
    },
    {
        title: "Desarrollador Backend",
        description: "Se especializa en el desarrollo del lado del servidor, manejo de bases de datos y lógica de aplicación.",
    },
    {
        title: "Desarrollador Blockchain",
        description: "Experto en tecnología de cadena de bloques, creando soluciones descentralizadas y contratos inteligentes.",
    },
    {
        title: "Matemático",
        description: "Experto en análisis y resolución de problemas complejos utilizando principios y teorías matemáticas.",
    },
    {
        title: "Estadístico",
        description: "Especializado en la interpretación y análisis de datos para informar decisiones basadas en evidencia.",
    },
    {
        title: "DevOps",
        description: "Integra desarrollo y operaciones para mejorar la agilidad y eficiencia del ciclo de vida del software.",
    },
    {
        title: "Desarrollador de Videojuegos",
        description: "Crea y diseña juegos interactivos, combinando habilidades técnicas y creativas.",
    },
];

const Card = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return cards.map((card, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl animate__animated animate__fadeInUp first-letter:" id="card">
            <figure id="imagenCard" className="">
                <img src="/images/camels.jpeg" alt="Cameelers" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                        Ver más
                    </button>
                    {/* <button className="btn btn-primary" onClick={this.openModal}>Ver más</button> */}
                </div>
            </div>
            <dialog key={`modal_${index}`} id={`my_modal_${index}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Offers - Apply</h3>
                    <ul>
                        <li>Company Wallet: </li>
                        <li>Value: </li>
                        <li>Description: </li>
                    </ul>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
    ));
};

export default Card;
