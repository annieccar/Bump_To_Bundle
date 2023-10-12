import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ItemTag({ item, user }) {
  const navigate = useNavigate();

  const handleClickAdmin = () => {
    return navigate(`/edititem/${item.id}`);
  };

  const handleClickVisitor = () => {
    return navigate(`/offeritem/${item.id}`);
  };

  return (
    <Container
      onClick={
        user.user_type === "administrator"
          ? () => {
              handleClickAdmin();
            }
          : () => {
              handleClickVisitor();
            }
      }
      className={item.status ? "available" : "unavailable"}
    >
      <ItemName>{item.name}</ItemName>
      <ItemInfo>
        Status: {item.status ? "Disponible" : "Non Disponible"}
      </ItemInfo>
    </Container>
  );
}

const Container = styled.button`
  width: 90%;
  border-radius: 10px;
  border: 1px solid #d4d2d2;
  font-family: "Montserrat";
  text-align: center;
  margin: 0.5em 0;

  &.available {
    background: #fff;
    color: #5f5e5e;
  }

  &.unavailable {
    background: #d4d2d2;
    border: 1px solid var(--input-grey, #a2a1a1);
    color: var(--input-grey, #a2a1a1);
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    width: 300px;
    margin: 0.5em;
  }
`;

const ItemName = styled.h3`
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0.5em 0;
`;

const ItemInfo = styled.p`
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0.5em 0;
`;

export default ItemTag;
