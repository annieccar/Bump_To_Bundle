import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <Text>@ 2023 BumToBundle</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6bcaf;
  height: 2em;
`;

const Text = styled.p`
  background: none;
  border: none;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  color: var(--text-color, #5f5e5e);
`;
