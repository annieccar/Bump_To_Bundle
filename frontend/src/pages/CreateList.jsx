import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import RadioButton from "../components/RadioButton";
import { useUserContext } from "../contexts/UserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function CreateList() {
  const expressAPI = interceptor();
  const [listname, setListName] = useState("");
  const [duedate, setDueDate] = useState("");
  const [sex, setSex] = useState("");
  const [babysname, setBabysName] = useState("");
  const { user } = useUserContext();
  const user_ID = user.id;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      listname.length > 2 &&
      duedate.length > 2 &&
      sex.length > 2 &&
      babysname.length > 2
    ) {
      const list = { listname, duedate, sex, babysname, user_ID };

      expressAPI
        .post(`/list`, list)
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
        <Title>Créer votre liste</Title>
        <Form onSubmit={handleSubmit}>
          <InputLabel htmlFor="listname">Nom de la liste:</InputLabel>
          <InputBox
            onChange={(e) => setListName(e.target.value)}
            type="text"
            name="listname"
            id="listname"
            value={listname}
          ></InputBox>
          <InputLabel htmlFor="duedate">Naissance due le:</InputLabel>
          <InputBox
            onChange={(e) => setDueDate(e.target.value)}
            type="text"
            name="duedate"
            id="duedate"
            value={duedate}
          ></InputBox>
          <SexCheckboxes>
            <RadioButton value="Garçon" state={sex} setState={setSex} />
            <RadioButton value="Fille" state={sex} setState={setSex} />
            <RadioButton
              value="Jumeaux ou plus..."
              state={sex}
              setState={setSex}
            />
            <RadioButton value="Surprise!" state={sex} setState={setSex} />
          </SexCheckboxes>
          <InputLabel htmlFor="babysname">Nom du bébé:</InputLabel>
          <InputBox
            onChange={(e) => setBabysName(e.target.value)}
            type="text"
            name="babysname"
            id="babysname"
            value={babysname}
          ></InputBox>
          <Text>Ou:</Text>
          <RadioButton
            value="Je préfères garder la surprise"
            state={babysname}
            setState={setBabysName}
          />
          <Buttonbox>
            <Button type="submit" value="Créer ma liste de naissance"></Button>
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
  padding: 0 1em;
  font-family: "Montserrat";
  font-size: 0.9em;
  font-weight: bold;
  box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const SexCheckboxes = styled.div`
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
