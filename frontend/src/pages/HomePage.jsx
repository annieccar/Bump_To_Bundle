import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Homepage>
      <Title>Bébé arrive bientôt...</Title>
      <Container>
        <Image src="../../src/assets/Images/fe-ngo-bvx3G7RkOts-unsplash (1).jpg" />
        <Paragraph>
          Bienvenue sur le site de notre liste de naissance! Ceci est un petit
          projet personnel que j'ai entamé durant ma formation de développeur
          web. Afin de pouvoir accéder à notre liste, veuillez commencer par
          vous créer un compte en cliquant sur le bouton suivant:
        </Paragraph>
      </Container>
      <Link to="/signin">
        <Button>Créer mon compte</Button>
      </Link>
      <SignInContainer>
        <InputLabel>Vous avez déjà un compte?</InputLabel>
        <InputLabelU onClick={() => navigate("/login")}>
          Connectez-vous ici
        </InputLabelU>
      </SignInContainer>
    </Homepage>
  );
}

const InputLabel = styled.label`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const InputLabelU = styled.label`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-decoration: underline;

  margin-left: 1em;
  &:hover {
    cursor: pointer;
  }
`;

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1em 0;
`;

const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`;

const Title = styled.h1`
  text-align: center;
  color: #666666;
  font-family: "Chilanka";
  margin: 1em;
  font-size: 2em;
  @media (min-width: 768px) {
    font-size: 2.2em;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 1em;
  @media (min-width: 768px) {
    width: 45%;
  }
`;

const Paragraph = styled.p`
  text-align: center;
  font-size: 1em;
  font-family: "Montserrat";
  color: #666666;
  padding: 1em 0.5em;

  @media (min-width: 768px) {
    backdrop-filter: blur(50px);
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    width: 95%;
  }
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
