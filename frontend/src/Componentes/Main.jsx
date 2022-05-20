import React from "react";
import "./1reset.css";
import * as M from "./Main";
import UserRegister from "./UserRegister.jsx";
import Login from "./Login.jsx";

const Main = (props) => {
  const [registerUser, setUser] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  return (
    <>
      {registerUser && (
        <UserRegister
          setUser={setUser}
          registerUser={props.setUsuarios}
          allUsers={props.usuarios}
        ></UserRegister>
      )}
      {login && <Login log = {setLogin}/>}

      <M.Main>
        <M.Card>
          <M.H1>ESCOLHA UMA OPÇÃO</M.H1>
          <M.Center>
            <M.Button onClick={() => setUser(true)}>Cadastrar Usuário</M.Button>
            <M.Button onClick={() => setLogin(true)}>Fazer login</M.Button>
          </M.Center>
        </M.Card>
      </M.Main>
    </>
  );
};

export default Main;
