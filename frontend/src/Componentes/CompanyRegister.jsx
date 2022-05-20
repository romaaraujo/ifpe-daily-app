import React from "react";
import "./1reset.css";
import * as CR from "./CompanyRegister";

const CompanyRegister = (props) => {
  const [nome, setNome] = React.useState("");
  const [cnpj, setCnpj] = React.useState("");
  const [data, setData] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [tipoData, setTipoData] = React.useState("text");
  const [nomeOk, setNomeOk] = React.useState(false);

  const dataConfig = (e) => {
    setTipoData("date");
  };

  async function correiosApi(cep) {
    const promise = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const enderecoObjeto = await promise.json();
    setEndereco(enderecoObjeto);
  }

  const numeroValido = (e) => {
    if (e.target.value.search(/[a-zA-Z]/) >= 0 || e.target.value.length >= 15) {
      return;
    } else {
      setCnpj(e.target.value);
    }
  };

  const cepConfig = (e) => {
    if (e.target.value.length > 8) return;
    setCep(e.target.value);
    setEndereco("");
    if (e.target.value.length === 8) {
      correiosApi(e.target.value);
    }
  };
  /* React.useEffect(()=>{
    setEndereco(cep);
  },[cep]) */

  return (
    <CR.Main>
      <CR.Form>
        <CR.H2>Cadastro de empresa</CR.H2>
        <CR.Input
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value.length >= 5) {
              setNomeOk(true);
            } else {
              setNomeOk(false);
            }
          }}
          type="text"
          value={nome}
          placeholder="Nome da empresa"
          required
        />
        {!nomeOk && <p>O nome da empresa deve ter, no mínimo, 5 caracteres</p>}
        <CR.Input
          onChange={numeroValido}
          type="text"
          value={cnpj}
          placeholder="CNPJ"
        />
        <CR.Input
          onClick={dataConfig}
          onChange={(e) => setData(e.target.value)}
          type={tipoData}
          value={data}
          placeholder="Data de fundação"
          required
        />
        <CR.Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="E-mail Comercial"
          required
        />
        <CR.Input
          onChange={(e) => setTelefone(e.target.value)}
          value={telefone}
          placeholder="Telefone"
          required
        />
        <CR.Input
          type="text"
          onChange={cepConfig}
          value={cep}
          placeholder="CEP"
          required
        />

        {endereco && <div><CR.H2>Endereço</CR.H2> <p>{endereco.uf} <br /> {endereco.localidade}</p></div>}
        
        <CR.Button2 disabled={!nomeOk}>Registrar</CR.Button2>
        <CR.Button2 onClick={() => props.setCompany(false)}>
          Cancelar
        </CR.Button2>
      </CR.Form>
    </CR.Main>
  );
};

export default CompanyRegister;
