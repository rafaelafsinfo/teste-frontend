"use client";

import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/form.css";
import Link from "next/link";

export default function home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioid, setFuncionarioid] = useState("");
  const [idade, setIdade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Perfil", {
        funcionario_id: funcionarioid,
        idade,
        endereco,
        telefone,
      });
      if (response.data.status && response.data.codigo === "002") {
        console.log("Sucess");
      }
    } catch (err) {
      setErro(err);
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Funcionario/")
      .then((response) => {
        if (response.data.status) {
          setFuncionarios(response.data.dados);
        } else {
          setErro(response.data.msg);
        }
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h1 class="formulario_titulo">Adicionar perfil de funcionario</h1>
      <form method="post" onSubmit={handleSubmit} class="formulario">
        <label class="formulario_label">
          Selecione o funcionário:
          <select
            class="formulario_select"
            value={funcionarioid}
            onChange={(event) => setFuncionarioid(event.target.value)}
            required
          >
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </select>
        </label>
            
        <br />
        <label class="formulario_label">
          idade:
          <input
            class="formulario_input"
            type="text"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
            required
          />
        </label>
        <br />
        <label class="formulario_label">
          endereco:
          <input
            class="formulario_input"
            type="text"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
          />
        </label>
        <br />
        <label class="formulario_label">
          telefone:
          <input
            class="formulario_input"
            type="number"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
          />
        </label>
        <br />
        <Link href="/">
          <button class="formulario_botao" type="submit">
            Enviar
          </button>
        </Link>
      </form>
      {erro && <div>{erro}</div>}
    </div>
  );
}
