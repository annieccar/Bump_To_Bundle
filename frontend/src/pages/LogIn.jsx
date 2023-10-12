import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useUserContext } from "../contexts/UserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function LogIn() {
  const expressAPI = interceptor();
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = data;

    expressAPI
      .post(`/auth/login`, user)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/birthlist");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <Page>
      <Formdiv>
        <Title>Connexion</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <InputBox
            type="email"
            {...register("email", {
              required: true,
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            name="email"
            // defaultValue={email}
          ></InputBox>
          {errors.email && (
            <ErrorSpan>Vous devez entrer une adresse mail valide</ErrorSpan>
          )}
          <InputLabel htmlFor="password">Mot de passe:</InputLabel>
          <InputBox
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            aria-invalid={errors.password ? "true" : "false"}
            name="password"
          ></InputBox>
          {errors.password && (
            <ErrorSpan>
              Votre mot de passe doit contenir au moins 8 caractères
            </ErrorSpan>
          )}
          <Buttonbox>
            <Button type="submit" value="Se connecter"></Button>
          </Buttonbox>
        </Form>
        <SignInContainer>
          <InputLabel>Vous n'avez pas de compte?</InputLabel>
          <InputLabelU onClick={() => navigate("/signin")}>
            Enregistrez-vous ici
          </InputLabelU>
        </SignInContainer>
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

const ErrorSpan = styled.span`
  color: var(--text-color, #ff0000);
  font-family: Montserrat;
  font-size: 14px;
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

const InputLabel = styled.label`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 0.8em 0;
`;

const InputLabelU = styled.label`
  color: var(--text-color, #5f5e5e);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-decoration: underline;
  margin: 0.8em 0;
  margin-left: 1em;

  &:hover {
    cursor: pointer;
  }
`;

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InputBox = styled.input`
  border-radius: 5px;
  border: 1px solid var(--input-grey, #a2a1a1);
  background: #fff;
  width: 100%;
  height: 35px;
  padding: 0px 10px;
`;

const Form = styled.form`
  width: 70%;
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
