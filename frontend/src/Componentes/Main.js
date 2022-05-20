import styled from "styled-components";

export const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #7fbe64 0%, #91c77b 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 80%;
  min-height: 50%;
  padding: 40px 0;
  background: #ffffff;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
`;

export const Button = styled.button`
  background: #83c069;
  color: white;
  width: 280px;
  height: 62px;
  font-size: 25px;
  cursor: pointer;
  &:Hover {
    background: #599B3D;
  }
`;

export const H1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
  font-family: "Rubik", sans-serif;
  color: #089716;
  text-align: center;
`;

export const Center = styled.div`
  max-width: 65%;
  display: flex;
  gap: 50px;
`;

export const H2 = styled.h2`
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
  font-family: "Rubik", sans-serif;
  color: #089716;
  text-align: center;
`;

export const Button2 = styled.button`
  background: #83c069;
  color: white;
  width: 60px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  &:Hover {
    background: #599B3D;
  }
`;