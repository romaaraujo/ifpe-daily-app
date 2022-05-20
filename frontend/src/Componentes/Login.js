import styled from "styled-components";

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
`;

export const Form = styled.form`
  width: 648px;
  background: #ffffff;
  padding: 35px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

export const Input = styled.input`
  background: #c4c4c4;
  width: 517px;
  height: 59px;
  border: none;
  outline: none;
  font-size: 30px;
  padding: 10px;
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
  width: 517px;
  height: 59px;
  font-size: 40px;
  cursor: pointer;
  &:Hover {
    background: #599B3D;
  }
`;