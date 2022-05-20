import React from "react";
import * as UR from "./UserRegister";
import { useValidateForm } from "../hook/useValidateForm";

const UserRegister = (props) => {
  const [nome, setNome] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [validLogin, setValidLogin] = React.useState(false);
  const {
    senha,
    senhaRepetida,
    senhaOK,
    senhaRepetidaOK,
    setSenha,
    setSenhaRepetida,
  } = useValidateForm();

  const loginValidation = (e) => {
    setLogin(e.target.value);
    const uniqueUser = props.allUsers.filter(element => element.login === e.target.value)
    if (uniqueUser.length > 0) {
      setValidLogin(true)
    } else {
      setValidLogin(false)
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    
    props.setUser(false);
  };

  return (
    <UR.Main>
      <UR.Form onSubmit={registerUser}>
        <UR.H2>Cadastro de usuário</UR.H2>
        <UR.Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <UR.Input
          type="text"
          value={login}
          onChange={loginValidation}
          placeholder="Login"
          required
        />
        {validLogin && <p>Login já existente</p>}
        <UR.Input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        {!senhaOK && (
          <p>
            Senha DEVE possuir letras e números com, no mínimo, 7 caracteres.
          </p>
        )}
        <UR.Input
          type="password"
          value={senhaRepetida}
          onChange={(e) => setSenhaRepetida(e.target.value)}
          placeholder="Repetir a senha"
          disabled={!senhaOK}
          required
        />
        {!senhaRepetidaOK && <p>As senhas devem ser iguais</p>}
        <UR.Button2 disabled={!(!(senha === senhaRepetida) || !validLogin)}>Cadastrar</UR.Button2>
        <UR.Button2 onClick={() => props.setUser(false)}>Cancelar</UR.Button2>
      </UR.Form>
    </UR.Main>
  );
};

export default UserRegister;
