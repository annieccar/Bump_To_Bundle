import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "./contexts/UserContext";
import styled from "styled-components";

import AppRoutes from "./routes/router";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Chilanka";
    src: url("./assets/Fonts/Chilanka/Chilanka-Regular.ttf");
  }

  @font-face {
    font-family: "Montserrat";
    src: url("./assets/Fonts/Montserrat/static/Montserrat-Medium.ttf");
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
