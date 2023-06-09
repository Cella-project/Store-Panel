import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

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
  background-color: #fefefe;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  text-shadow: 2px 1px 3px #737373;
  color: #ff3636;
  text-align: center;
  margin-bottom: 0;
`;

const Subtitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: #737373;
  text-shadow: 2px 1px 3px #737373;
  text-align: center;
  margin-top: 0;
  animation: ${notFoundTextAnimation} 4s ease-in-out infinite;
`;

const Button = styled(Link)`
  background-color: #70c8b0;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  margin-top: 3rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  text-shadow: 2px 1px 3px #737373;

  &:hover {
    background-color: #737373;
    color: #70c8b0;
    transform: scale(1.1);
  }
`;

const NotFound = () => {
    return (
        <Container>
            <Title>404</Title>
            <Subtitle>Page not found</Subtitle>
            <Button to="/">Go back to Home</Button>
        </Container>
    );
};

export default NotFound;
