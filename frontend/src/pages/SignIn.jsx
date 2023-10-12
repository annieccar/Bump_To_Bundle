import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useUserContext } from "../contexts/UserContext";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function SignIn() {
  const { setUser } = useUserContext();
  const expressAPI = interceptor();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const user = data;
    delete user.confirmpassword;

    expressAPI
      .post(`/auth/signup`, user)
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
        <Title>Création de compte</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="firstname">Prénom:</InputLabel>
          <InputBox
            type="text"
            {...register("firstname", {
              required: true,
              minLength: 2,
            })}
            aria-invalid={errors.firstname ? "true" : "false"}
            name="firstname"
            // defaultValue={firstname}
          ></InputBox>
          {errors.firstname && (
            <ErrorSpan>
              Votre prénom doit contenir au moins 2 caractères
            </ErrorSpan>
          )}
          <InputLabel htmlFor="lastname">Nom:</InputLabel>
          <InputBox
            type="text"
            {...register("lastname", {
              required: true,
              minLength: 2,
            })}
            aria-invalid={errors.lastname ? "true" : "false"}
            name="lastname"
            // defaultValue={lastname}
          ></InputBox>
          {errors.lastname && (
            <ErrorSpan>
              Votre nom de famille doit contenir au moins 2 caractères
            </ErrorSpan>
          )}
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
          <InputLabel htmlFor="confirmPassword">
            Confirmer le mot de passe:
          </InputLabel>
          <InputBox
            type="password"
            {...register("confirmpassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            aria-invalid={errors.confirmpassword ? "true" : "false"}
            name="confirmpassword"
          ></InputBox>
          {errors.confirmpassword && (
            <ErrorSpan>Vos mots de passe ne correspondent pas</ErrorSpan>
          )}
          <Buttonbox>
            <Button type="submit" value="S'enregistrer"></Button>
          </Buttonbox>
        </Form>
        <SignInContainer>
          <InputLabel>Vous avez déjà un compte?</InputLabel>
          <InputLabelU onClick={() => navigate("/login")}>
            Connectez-vous ici
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

const ErrorSpan = styled.span`
  color: var(--text-color, #ff0000);
  font-family: Montserrat;
  font-size: 14px;
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
