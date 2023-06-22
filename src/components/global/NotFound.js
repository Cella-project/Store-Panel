import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const mode = useSelector((state) => state.theme.mode);

  const notFoundTextAnimation = keyframes`
  0% {
    transform: translateX(-50%);
  }

  50% {
    transform: translateX(50%);
  }

  100% {
    transform: translateX(-50%);
  }
`;

  const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${mode === "dark-mode" ? "#18191a" : "#f5f3fc"};
`;

  const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  text-shadow: ${mode === "dark-mode" ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"}};
  color: #ff3636;
  text-align: center;
  margin-bottom: 0;
`;

  const Subtitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${mode === "dark-mode" ? "#fefefe" : "#737373"};
  text-shadow: ${mode === "dark-mode" ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"};
  text-align: center;
  margin-top: 0;
  animation: ${notFoundTextAnimation} 4s ease-in-out infinite;
`;

  const Button = styled(Link)`
  background-color: ${mode === "dark-mode" ? "#163a4a" : "#70c8b0"}};
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  margin-top: 3rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  text-shadow: ${mode === "dark-mode" ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"};

  &:hover {
    background-color: ${mode === "dark-mode" ? "#163a4a" : "70c8b0"};
    color: ${mode === "dark-mode" ? "#fff" : "#fff"};
    transform: scale(1.1);
  }
`;

  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page not found</Subtitle>
      <Button to="/">Go back to Home</Button>
    </Container>
  );
};

export default NotFound;
