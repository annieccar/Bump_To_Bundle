import axios from "axios";
import { useState, useEffect } from "react";

import styled from "styled-components";

import { useUserContext } from "../contexts/UserContext";
import GiftCard from "../components/GiftCard";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import interceptor from "../hooks/useInstanceWithInterceptor";

function MyGifts() {
  const expressAPI = interceptor();

  const { user } = useUserContext();
  const [gifts, setGifts] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    expressAPI
      .get(`/item/mygifts/${user.id}`)
      .then((response) => {
        const data = response.data;
        setGifts(data);
      })
      .catch((error) => console.error(error));
  }, [user.id, editModal, deleteModal]);

  return (
    <Page>
      <Title>Mes cadeaux offerts</Title>
      {gifts.length === 0 ? (
        <Text>Vous n'avez pas encore sélectionné de cadeau à offrir</Text>
      ) : (
        <CardBox>
          {gifts.map((gift) => (
            <GiftCard
              key={gift.ID}
              gift={gift}
              setEditModal={setEditModal}
              setDeleteModal={setDeleteModal}
            />
          ))}
        </CardBox>
      )}

      {editModal && (
        <>
          <EscapeModal onClick={() => closeModal()} />
          <EditModal setEditModal={setEditModal} />
        </>
      )}
      {deleteModal && (
        <>
          <EscapeModal onClick={() => closeModal()} />
          <DeleteModal setDeleteModal={setDeleteModal} />
        </>
      )}
    </Page>
  );
}

export default MyGifts;

const Title = styled.h1`
  text-align: center;
  color: #666666;
  font-family: "Chilanka";
  margin: 0.5em;
  margin-top: 1em;
  font-size: 2em;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: start;
    flex-wrap: wrap;
    width: 80%;
    justify-content: center;
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

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min-content;
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
