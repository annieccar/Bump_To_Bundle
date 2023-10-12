import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function GiftConfirmModal({ setModal }) {
  const navigate = useNavigate();

  const closeModal = () => {
    setModal(false);
    navigate("/birthlist");
  };
  return (
    <OfferBox>
      <Text>
        Votre choix de cadeau a bien été pris en compte. Vous pouvez modifier
        votre sélection si vous le souhaitez, en vous rendant sur l'onglet "Mes
        cadeaux" dans le menu utilisateur en haut à droite de la page.
      </Text>
      <Button onClick={() => closeModal()}>Fermer</Button>
    </OfferBox>
  );
}

const Button = styled.button`
  background: #f6bcaf;
  border: none;
  border-radius: 50px;
  color: #666666;
  height: 42px;
  width: 100px;
  font-family: "Montserrat";
  font-size: 0.9em;
  font-weight: bold;
  box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 1em;
  &:hover {
    cursor: pointer;
  }
`;
const OfferBox = styled.div`
  border-radius: 10px;
  border: 2px solid #c6d4ce;
  background: #c6d4ce;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-top: 1em;
  margin-bottom: 1em;
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.h2`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 0.8em;
  font-weight: 500;
`;

export default GiftConfirmModal;
