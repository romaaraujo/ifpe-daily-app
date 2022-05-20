import React from "react";
import "./1reset.css";
import * as L from './Login.js'

const Login = (props) => {
    const [usuario, setUsuario] = React.useState('')
    const [senha, setSenha] = React.useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        props.log(false);
    }
  return (
    <L.Main>
        <L.Form onSubmit={submitHandler}>
            <L.Input type='text' onChange={(e) => setUsuario(e.target.value)} value={usuario} placeholder="Usuário" required/>
            <L.Input type='password' onChange={(e) => setSenha(e.target.value)} alue={senha} placeholder="Senha" required/>
            <L.Button2>Logar</L.Button2>
            <L.Button2 onClick={()=> props.log(false)}>Cancelar</L.Button2>
        </L.Form>
    </L.Main>
  )
};

export default Login;