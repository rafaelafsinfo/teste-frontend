"use client"

import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Home({params}) {

  const { id } = params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/Perfil/${params.id}`);
      const apiData = response.data.dados;
      setData(apiData);
    };
    fetchData();
  }, [id]);

  if (!data[0]) {

    return <p>Loading...</p>; // render a loading message if data is not available

  }
      const funcionario = data[0]
  return (
    <div>
          <Navbar/>
          <h1>Perfil do Funcionário</h1>
          
          <p>Nome: {funcionario.nome}</p>
          <p>Cargo: {funcionario.cargo}</p>
          <p>Salário: {funcionario.salario}</p>
          <p>Idade: {funcionario.idade}</p>
          <p>Endereço: {funcionario.endereco}</p>
          <p>Telefone: {funcionario.telefone}</p>
      </div>
  );
}