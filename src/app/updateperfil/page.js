"use client";

import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/form.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";

export default function home() {
  const [id, setId] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioId, setFuncionarioId] = useState("");
  const [funcionarioData, setFuncionarioData] = useState({});
  const [idade, setIdade] = useState("");

  const [endereco, setEndereco] = useState("");

  const [telefone, setTelefone] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil")
      .then((response) => {
        setFuncionarios(response.data.dados);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/Perfil`, {
        id,
        funcionario_id: funcionarioId,
        idade,
        endereco,
        telefone,
      });

      if (response.status === 200) {
        alert("Funcionario updated successfully!");
      } else {
        setError("Error updating funcionario");
      }
    } catch (error) {
      setError("Error updating funcionario");
    }
  };

  useEffect(() => {
    if (funcionarioId) {
      const funcionario = funcionarios.find(
        (f) => f.id_funcionario === funcionarioId
      );
      if (funcionario) {
        setIdade(funcionario.idade);
        setEndereco(funcionario.endereco);
        setTelefone(funcionario.telefone);
      }
    }
  }, [funcionarioId, funcionarios]);

  const handleFuncionarioChange = async (event) => {
    setFuncionarioId(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:5000/perfil/${event.target.value}`
      );
  
      if (response.data && response.data.dados && response.data.dados[0]) {
        const selectedFuncionarioData = response.data.dados[0];
        setFuncionarioData(selectedFuncionarioData);
  
        setId(selectedFuncionarioData.id);
        setIdade(selectedFuncionarioData.idade);
        setEndereco(selectedFuncionarioData.endereco);
        setTelefone(selectedFuncionarioData.telefone);
      } else {
        console.error("Failed to retrieve funcionario data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Adicionar perfil de funcionario</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Selecione o funcionário: {id}
          <select
            value={funcionarioId}
            onChange={handleFuncionarioChange}
            required
          >
            <option>selecione um funcionario</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id_funcionario} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </select>
        </label>
            
        <br />
        <label>
          idade:
          <input
            type="text"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          endereco:
          <input
            type="text"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          telefone:
          <input
            type="number"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
          />
        </label>
        <br />
        <Link href="/">
          <button type="submit">Enviar</button>
        </Link>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
