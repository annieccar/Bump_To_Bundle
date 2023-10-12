import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

import interceptor from "../hooks/useInstanceWithInterceptor";

function GiftCard({ gift, setEditModal, setDeleteModal }) {
  const expressAPI = interceptor();
  const [offeredQTY, setOfferedQTY] = useState("");

  const handleEdit = async () => {
    let newReqQty = gift.required_quantity;
    if (offeredQTY) {
      newReqQty = gift.required_quantity + gift.offered_quantity - offeredQTY;
    }

    try {
      //modif qté dans table user_has_gift
      const modifyOfferedQtyResponse = await expressAPI.put(
        `/item/editoffered/${gift.ID}`,
        { offeredQTY }
      );

      //modif qté dans table item
      const modifyItemQtyResponse = await expressAPI.put(
        `/item/editqty/${gift.gift_id}`,
        { newReqQty }
      );

      if (
        modifyOfferedQtyResponse.status === 200 &&
        modifyItemQtyResponse.status === 200
      ) {
        setEditModal(true);
        setOfferedQTY("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async () => {
    let newReqQty = gift.required_quantity + gift.offered_quantity;

    try {
      //modif qté dans table item
      const modifyItemQtyResponse = await expressAPI.put(
        `/item/editqty/${gift.gift_id}`,
        { newReqQty }
      );
      console.log(modifyItemQtyResponse);

      //   supprimer données dans table user_has_gift
      const deleteOfferedResponse = await expressAPI.delete(
        `/item/offered/${gift.ID}`
      );
      console.log(deleteOfferedResponse);

      if (
        modifyItemQtyResponse.status === 200 &&
        deleteOfferedResponse.status === 204
      ) {
        setDeleteModal(true);
        setOfferedQTY("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <OfferBox>
      <TextLarge>{gift.name}</TextLarge>
      <Input>
        <Text>Quantité offerte:</Text>
        <Qty>{gift.offered_quantity}</Qty>
      </Input>
      <Text>Lien vers l'item:</Text>
      {gift.link ? (
        <Anchor href={gift.link}>{gift.link}</Anchor>
      ) : (
        <Info>Sans Objet</Info>
      )}
      <Text>Information complémentaire:</Text>
      {gift.details ? <Info>{gift.details}</Info> : <Info>Sans Objet</Info>}
      <Input>
        <InputLabel htmlFor="offeredQTY">
          Modifier la quantité offerte:{" "}
        </InputLabel>{" "}
        <InputBox
          onChange={(e) => setOfferedQTY(e.target.value)}
          type="number"
          name="OfferedQty"
          id="OfferedQty"
          value={offeredQTY}
        ></InputBox>
      </Input>
      <ButtonBox>
        <Button onClick={() => handleEdit()}>Enregistrer</Button>
        <Button onClick={() => handleDelete()}>Supprimer</Button>
      </ButtonBox>
    </OfferBox>
  );
}

export default GiftCard;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 768px) {
    position: absolute;
    bottom: 20px;
  }
`;

const Anchor = styled.a`
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1em;
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #666666;
  font-family: "Chilanka";
  margin: 0.5em;
  margin-top: 1em;
  font-size: 2em;
`;

const Input = styled.div`
  display: flex;
  align-items: baseline;
`;

const InputLabel = styled.label`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 0.8em 0;
`;

const Qty = styled.div`
  margin-left: 1em;
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const InputBox = styled.input`
  border-radius: 5px;
  border: 1px solid var(--input-grey, #a2a1a1);
  background: #fff;
  width: 40px;
  height: 20px;
  margin-bottom: 0.5em;
  margin-left: 1em;
  font-family: "Montserrat";
  color: var(--text-color, #5f5e5e);
  text-align: center;
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
  width: 80%;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1em;
  position: relative;
  @media (min-width: 768px) {
    width: 300px;
    margin: 1em 1em;
    height: 430px;
  }
`;

const Button = styled.button`
  background: #f6bcaf;
  border: none;
  border-radius: 50px;
  color: #666666;
  height: 42px;
  padding: 0 1.5em;
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

const Text = styled.h2`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 0.8em;
  font-weight: 600;
`;

const TextLarge = styled.h2`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  margin-bottom: 0.8em;
  font-weight: 500;
`;

const Info = styled.p`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1em;
  width: 100%;
  height: auto;
`;

const EscapeModal = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 0;
  backdrop-filter: blur(30px);
`;
