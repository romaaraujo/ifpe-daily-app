import React, { useEffect } from "react";

export const useValidateForm = () => {
  const [senha, setSenha] = React.useState("");
  const [senhaRepetida, setSenhaRepetida] = React.useState("");
  const [senhaOK, setSenhaOK] = React.useState(false);
  const [senhaRepetidaOK, setSenhaRepetidaOK] = React.useState(false);

  const testeSenha = (senha) => {
    if (senha.search(/[a-zA-Z]/) !== -1 && senha.search(/\d/) !== -1) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const senhaTestada = testeSenha(senha);
    if (senha.length >= 7 && senhaTestada) {
      setSenhaOK(true);
    } else {
      setSenhaOK(false);
    }
  }, [senha]);

  useEffect(() => {
    if (senha === senhaRepetida) {
      setSenhaRepetidaOK(true);
    } else {
      setSenhaRepetidaOK(false);
    }
  }, [senhaRepetida]);
  return {
    senha,
    senhaRepetida,
    setSenhaRepetidaOK,
    senhaOK,
    senhaRepetidaOK,
    setSenha,
    setSenhaRepetida,
    setSenhaOK
  };
};
