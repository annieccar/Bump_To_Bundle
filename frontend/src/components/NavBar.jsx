import { BiSolidUser } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";

import interceptor from "../hooks/useInstanceWithInterceptor";

export default function NavBar() {
  const expressAPI = interceptor();
  const { user, setUser } = useUserContext();
  const [isMobile, setIsMobile] = useState(true);
  const [userMenu, setUserMenu] = useState(false);

  const navigate = useNavigate();

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

  const handleLogOut = () => {
    expressAPI
      .get(`/auth/logout`)
      .then((res) => {
        if (res.status === 200) console.log("logged out");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    setUser("");
    localStorage.removeItem("user");
    setUserMenu(false);
    navigate("/");
  };

  const goToList = () => {
    setUserMenu(false);
    navigate("/birthlist");
  };

  const goToGifts = () => {
    setUserMenu(false);
    navigate("/mygifts");
  };

  return (
    <Nav>
      <Link to="/" style={{ height: "75%" }}>
        <Logo src="../src/assets/Logo/png/logo-no-background.png" />
      </Link>
      <Container>
        {user && !isMobile ? (
          <DesktopListButton onClick={() => goToList()}>
            Consulter la liste
          </DesktopListButton>
        ) : (
          ""
        )}
        {user && !isMobile ? (
          <DesktopListButton onClick={() => goToGifts()}>
            Mes cadeaux
          </DesktopListButton>
        ) : (
          ""
        )}
        <Button
          onClick={!user ? () => navigate("/login") : () => setUserMenu(true)}
        >
          {!user ? (
            <BiSolidUser
              style={{
                color: "#666666",
                height: "2em",
                width: "2em",
              }}
            />
          ) : (
            <User>
              <BiSolidUser
                style={{
                  color: "#666666",
                  height: "1.2em",
                  width: "1.2em",
                }}
              />
              <Name>{user.firstname}</Name>
            </User>
          )}
        </Button>
      </Container>

      {userMenu && (
        <>
          <EscapeMenu
            onClick={() => {
              setUserMenu(false);
            }}
          />
          <Menu>
            {isMobile ? (
              <ListButton onClick={() => goToList()}>
                Consulter la liste
              </ListButton>
            ) : (
              ""
            )}
            {isMobile ? (
              <ListButton onClick={() => goToGifts()}>Mes cadeaux</ListButton>
            ) : (
              ""
            )}
            <ListButton onClick={() => handleLogOut()}>Déconnexion</ListButton>
          </Menu>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  background: #c6d4ce;
  height: 4em;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (min-width: 768px) {
    height: 4.2em;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  margin-left: 8px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fffefa;
  border: 1px solid #5f5e5e;
  border-radius: 5px;
  justify-content: space-around;
  position: absolute;
  right: 9px;
  top: 4.5em;
  width: 8em;
  z-index: 10;

  @media (min-width: 768px) {
    top: 4.5em;
    width: 10em;
  }
`;

const EscapeMenu = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: var(--text-color, #5f5e5e);
  padding: 1em;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const ListButton = styled.button`
  background: none;
  border: none;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: var(--text-color, #5f5e5e);
  padding: 1em;
  &:hover {
    color: #c6d4ce;
    cursor: pointer;
  }
`;

const DesktopListButton = styled.button`
  background: none;
  border: none;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  color: var(--text-color, #5f5e5e);
  padding: 1em;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  height: 100%;
  margin: 0 1em;
`;
