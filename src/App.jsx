import React, { useState, useRef } from "react";

function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const nomeRef = useRef(null);
  const telefoneRef = useRef(null);

  const limparInputs = () => {
    setCep('');
    setEndereco(null);
    nomeRef.current.value = '';
    telefoneRef.current.value = '';
  };

  const enviarWhatsapp = () => {
    const telefone = telefoneRef.current.value;
    const nome = nomeRef.current.value;
    const mensagem = `Olá ${nome}! Logradouro:${endereco.logradouro}, Bairro:${endereco.bairro}, Cidade: ${endereco.localidade}`;
    const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setEndereco(data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  return (
    <div className="container">
      <h1>BUSQUE SEU CEP</h1>
      <div className="conteiner">
        <input type="text" ref={nomeRef} placeholder="Digite seu Nome" />
        <input type="tel" ref={telefoneRef} placeholder="Digite seu Telefone" />
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite seu CEP" />
        {endereco && (
          <div>
            <h2>Endereço encontrado:</h2>
            <div className="enderecos">
              <label>Logradouro: </label>
              <input type='text' value={endereco.logradouro} readOnly />
              <label>Bairro: </label>
              <input type='text' value={endereco.bairro} readOnly />
              <label>Cidade: </label>
              <input type='text' value={endereco.localidade} readOnly />
              <label>Estado: </label>
              <input type='text' value={endereco.uf} readOnly />
            </div>
          </div>
        )}
        <div className="buttons-env">
          <button onClick={buscarCep}>Buscar</button>
          <button onClick={limparInputs}>Limpar</button>
          <button onClick={enviarWhatsapp}>Enviar WP</button>
        </div>
      </div>
    </div>
  );
}

export default App;
