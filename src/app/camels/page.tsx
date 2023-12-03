"use client";

import { useState } from "react";
import { Banner } from "components/banner";
import { Card } from "components/card";
import { Modal } from "components/modal";

const camelsOppotunities () => {
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState("");

    const handleCardClick = (info: string) => {
        setModalInfo(info);
        setShowModal(true);
    };
    
    const cards = Card.map((Card) => (
        <Card key={Card.id} onClick={() => handleCardClick(Card.info)} />
    ));
    
    return (
        <div>
            <Banner />
            <div>
                <Card onClick={() => handleCardClick("Card 1")} />
            </div>
            {showModal && <Modal info={modalInfo} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default camelsOppotunities;


