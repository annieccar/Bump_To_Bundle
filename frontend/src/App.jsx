import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "./contexts/UserContext";
import styled from "styled-components";

import AppRoutes from "./routes/router";

import { createGlobalStyle } from "styled-components";

import chilankaFont from "./assets/Fonts/Chilanka/Chilanka-Regular.ttf";
import montserratFont from "./assets/Fonts/Montserrat/static/Montserrat-Medium.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Chilanka";
    src: url(${chilankaFont});
  }

  @font-face {
    font-family: "Montserrat";
    src:url(${montserratFont});
  }
  body{
    background: #FFFEFA;
  }
`;

function App() {
  return (
    <AppContainer>
      <UserContextProvider>
        <GlobalStyle />
        <NavBar />
        <MainContent>
          <AppRoutes />
        </MainContent>
        <Footer />
      </UserContextProvider>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-bottom: 2em;
`;
// test note
