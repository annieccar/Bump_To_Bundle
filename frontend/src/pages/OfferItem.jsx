import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import GiftConfirmModal from "../components/GiftConfirmModal";
import { useUserContext } from "../contexts/UserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function OfferItem() {
  const expressAPI = interceptor();

  const [item, setItem] = useState({});
  const [modal, setModal] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { user } = useUserContext();
  const userId = user.id;

  const [offeredQTY, setOfferedQTY] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    expressAPI
      .get(`/item/${id}`)
      .then((response) => {
        const data = response.data[0];
        setItem(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleOffer = async () => {
    try {
      let quantity = item.quantity - offeredQTY;
      item.quantity = quantity;
      if (quantity > 0) {
        item.status = 1;
      } else {
        item.status = 0;
      }

      const modifyItemResponse = await expressAPI.put(`/item/${id}`, item);

      const userHasGiftResponse = await expressAPI.post(`/item/offer`, {
        userId,
        id,
        offeredQTY,
      });

      if (
        modifyItemResponse.status === 200 &&
        userHasGiftResponse.status === 201
      ) {
        setModal(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const closeModal = () => {
    setModal(false);
    navigate("/birthlist");
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  window.addEventListener("resize", handleResize);

  return (
    <>
      <Page>
        {isMobile ? (
          <Back onClick={() => navigate("/birthlist")}>
            <BsFillArrowLeftSquareFill
              style={{
                color: "#666666",
                height: "1.2em",
                width: "1.2em",
              }}
            />
            <BackText>Retour à la liste</BackText>
          </Back>
        ) : (
          ""
        )}
        <Formdiv>
          <Title>{item.name}</Title>
          <Input>
            <Text>Quantité requise:</Text>
            <Qty>{item.quantity}</Qty>
          </Input>
          <Text>Lien vers l'item:</Text>
          <Info>
            {item.link ? (
              <Hyperlink href={item.link}>{item.link}</Hyperlink>
            ) : (
              "Aucun item en particulier n'a été choisi"
            )}
          </Info>
          {item.photo && (
            <Image
              src={`${import.meta.env.VITE_BACKEND_URL}/public/itemsphotos/${
                item.photo
              }`}
            />
          )}
          <Text>Information complémentaire:</Text>
          <Info>
            {item.details
              ? item.details
              : "Aucune information complémentaire n'a été spécifiée"}
          </Info>
          <OfferBox>
            <Text>Si vous souhaitez offrir ce cadeau:</Text>
            <Input>
              <InputLabel htmlFor="offeredQTY">Quantité offerte: </InputLabel>
              <InputBox
                onChange={(e) => setOfferedQTY(e.target.value)}
                type="number"
                name="OfferedQty"
                id="OfferedQty"
                value={offeredQTY}
              ></InputBox>
            </Input>
            <Button onClick={() => handleOffer()}>Confirmer</Button>
          </OfferBox>
        </Formdiv>
      </Page>
      {modal && (
        <>
          <EscapeModal onClick={() => closeModal()} />
          <GiftConfirmModal setModal={setModal} />
        </>
      )}
    </>
  );
}

const Back = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  color: #666666;
  font-family: "Chilanka";
  border: none;
  margin-top: 1em;
  margin-left: 1em;
  height: 2em;
  width: 100%;
`;

const BackText = styled.p`
  margin: 0;
  margin-left: 0.5em;
  text-align: center;
  font-size: 1.2em;
  transform: translateY(1px);
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
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
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

const Hyperlink = styled.a`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 5em;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
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

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`;

const Formdiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
  @media (min-width: 768px) {
    width: 500px;
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
  width: 70%;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Button = styled.button`
  background: #f6bcaf;
  border: none;
  border-radius: 50px;
  color: #666666;
  height: 42px;
  width: 180px;
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
  margin-botttom: 1em;
  width: 90%;
`;

const EscapeModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
  backdrop-filter: blur(30px);
`;
