import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import RadioButton from "../components/RadioButton";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function AddItem() {
  const expressAPI = interceptor();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [photoFile, setPhotoFile] = useState([]);
  const status = 1;

  const { list_ID } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (name.length > 2 && quantity && category.length > 2) {
      if (photoFile.length > 0) {
        formData.append("photo", photoFile[0]);
      } else {
        formData.append("photo", "");
      }

      formData.append("name", name);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("link", link);
      formData.append("details", details);
      formData.append("status", status);
      formData.append("list_ID", list_ID);

      expressAPI
        .post(`/item`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          return navigate("/birthlist");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      alert("Fields cannot be null");
    }
  };

  return (
    <Page>
      <Formdiv>
        <Title>Add an item to my list</Title>
        <Form onSubmit={handleSubmit}>
          <InputLabel htmlFor="name">Item name:</InputLabel>
          <InputBox
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            value={name}
          ></InputBox>
          <InputLabel htmlFor="quantity">Quantity needed:</InputLabel>
          <InputBox
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            name="Quantity"
            id="Quantity"
            value={quantity}
          ></InputBox>
          <Text>Select category:</Text>
          <CategoryCheckboxes>
            <RadioButton
              value="Salle de bain"
              state={category}
              setState={setCategory}
            />
            <RadioButton
              value="Vêtements"
              state={category}
              setState={setCategory}
            />
            <RadioButton
              value="Chambre"
              state={category}
              setState={setCategory}
            />
            <RadioButton
              value="Repas"
              state={category}
              setState={setCategory}
            />
            <RadioButton
              value="Soins"
              state={category}
              setState={setCategory}
            />
            <RadioButton value="Jeux" state={category} setState={setCategory} />
            <RadioButton
              value="Autre"
              state={category}
              setState={setCategory}
            />
          </CategoryCheckboxes>
          <InputLabel htmlFor="link">Link to item selected:</InputLabel>
          <InputBox
            onChange={(e) => setLink(e.target.value)}
            type="text"
            name="link"
            id="link"
            value={link}
          ></InputBox>
          <InputLabel htmlFor="photo">Drag or upload photo:</InputLabel>
          <InputBox
            onChange={(e) => setPhotoFile(e.target.files)}
            type="file"
            name="photo"
            id="photo"
            // value={photo}
          ></InputBox>
          <InputLabel htmlFor="details">
            Provide additionnal details:
          </InputLabel>
          <TextArea
            onChange={(e) => setDetails(e.target.value)}
            name="details"
            id="details"
            rows="5"
            value={details}
          ></TextArea>
          <Buttonbox>
            <Button type="submit" value="Enregistrer"></Button>
          </Buttonbox>
        </Form>
      </Formdiv>
    </Page>
  );
}

const Title = styled.h1`
  text-align: center;
  color: #666666;
  font-family: "Chilanka";
  margin: 1em;
  font-size: 2em;
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

const Formdiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
  @media (min-width: 768px) {
    width: 400px;
  }
`;

const InputBox = styled.input`
  border-radius: 5px;
  border: 1px solid var(--input-grey, #a2a1a1);
  background: #fff;
  width: 100%;
  height: 35px;
  margin-bottom: 1em;
  font-family: Montserrat;
  color: var(--text-color, #5f5e5e);
`;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttonbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2em 0;
`;

const Button = styled.input`
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

  &:hover {
    cursor: pointer;
  }
`;

const CategoryCheckboxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0;
`;

const Text = styled.p`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 0.8em 0;
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid var(--input-grey, #a2a1a1);
  background: #fff;
  width: 100%;
  font-family: Montserrat;
  color: var(--text-color, #5f5e5e);
`;
