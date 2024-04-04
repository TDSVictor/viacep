import React, { useState } from "react";

function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

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
    
    <div className="conteiner">
      <h1>Busque seu CEP</h1><br/>
      <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite seu CEP" />
      <button onClick={buscarCep}>Buscar</button>

      {endereco && (
        <div>
          <h2>Endereço encontrado:</h2>
          <p>CEP: <input type='text' value={endereco.cep} readOnly /></p>
          <p>Logradouro: <input type='text' value={endereco.logradouro} readOnly /></p>
          <p>Bairro: <input type='text' value={endereco.bairro} readOnly /></p>
          <p>Cidade: <input type='text' value={endereco.localidade} readOnly /></p>
          <p>Estado: <input type='text' value={endereco.uf} readOnly /></p>
        </div>
      )}
    </div>
  )
}

export default App;
