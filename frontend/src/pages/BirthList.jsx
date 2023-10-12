import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import ItemTag from "../components/ItemTag";
import { useUserContext } from "../contexts/UserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

function BirthList() {
  const [items, setItems] = useState([]);
  const [listInfo, setListInfo] = useState([]);
  const { user } = useUserContext();
  const expressAPI = interceptor();

  //A modifier selon utilisateur connecté
  const list_ID = 1;

  const categories = [
    "Salle de bain",
    "Vêtements",
    "Chambre",
    "Repas",
    "Soins",
    "Jeux",
    "Autre",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await expressAPI.get(`/item?list_ID=${list_ID}`);
        const listResponse = await expressAPI.get(`/list/${list_ID}`);
        setItems(itemsResponse.data);
        setListInfo(listResponse.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const dateObj = new Date(listInfo.duedate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("fr-Fr", options);

  return (
    <Page>
      <ListInfo>
        <Title>Liste de naissance : {listInfo.listname}</Title>
        <Text>
          Pour bébé {listInfo.sex}{" "}
          {listInfo.babysname === "Not sure yet/Keeping the surprise"
            ? ""
            : listInfo.babysname}{" "}
          dû le {formattedDate}
        </Text>
      </ListInfo>
      <List>
        {categories.map((category) => (
          <CategoryCard key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <TagBox>
              {items
                .filter(
                  (item) =>
                    item.category.toLowerCase() === category.toLowerCase()
                )
                .map((item) => (
                  <ItemTag key={item.id} item={item} user={user} />
                ))}
            </TagBox>
          </CategoryCard>
        ))}
        {user.id === listInfo.user_ID && (
          <Link to={`/additem/${listInfo.id}`}>
            <Button>Ajouter un item</Button>
          </Link>
        )}
      </List>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`;

const ListInfo = styled.div`
  width: 80%;
`;

const Text = styled.p`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0.8em 0;
`;

const Title = styled.h1`
  text-align: center;
  color: #666666;
  font-family: "Chilanka";
  margin: 1em;
  font-size: 2em;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 100%;
  }
`;
const CategoryCard = styled.div`
  width: 309px;
  height: auto;
  flex-shrink: 0;
  border-radius: 10px;
  background: #c6d4ce;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5f5e5e;
  text-align: center;
  padding: 0.5em;
  margin: 1em 0;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 95%;
  }
`;

const CategoryTitle = styled.h1`
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin: 0.5em 0;
`;

const Button = styled.button`
  background: #f6bcaf;
  border: none;
  border-radius: 50px;
  color: #666666;
  height: 42px;
  width: 180px;
  margin: 1em;
  font-family: "Montserrat";
  font-size: 0.9em;
  font-weight: bold;
  box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    cursor: pointer;
  }
`;

export default BirthList;
