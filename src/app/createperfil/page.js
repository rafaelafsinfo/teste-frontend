"use client"

import Navbar from "@/app/components/Navbar";
import React, { useState,useEffect } from 'react';
import axios from "axios";
import styles from '../styles/form.css'
import { redirect } from "next/navigation";
import { useRouter } from "next/router";


export default function home() {

    const [funcionarios,setFuncionarios] = useState([])
    const [funcionarioid, setFuncionarioid] = useState('');
    const [idade, setIdade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState(null);
    const router = useRouter()

    const handleSubmit = async (event) => {
      event.preventDefault();
      try{
        const response = await axios.post("http://localhost:5000/Perfil",{
            funcionario_id: funcionarioid,
            idade,
            endereco,
            telefone
        })
        if(response.data.status && response.data.codigo === "002"){
            console.log('Sucess')
        }
      }catch(err){
        setErro(err)
        console.log(err)
      }
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/Funcionario/')
        .then(response => {
            if(response.data.status){
                setFuncionarios(response.data.dados)
            }else{
                setErro(response.data.msg)
            }
        })
        .catch(error => {
            setErro(error.message)
        })
    },[])

    return(
        <div>
            <Navbar/>
            <h1>Adicionar perfil de funcionario</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label>

                Selecione o funcionário:

                <select value={funcionarioid} onChange={(event) => setFuncionarioid(event.target.value)} required>

                    <option value="">Selecione um funcionário</option>
                    {funcionarios.map((funcionario) => (

                        <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
                    ))}
                </select>
                </label>
                <br />
                <label>
                    idade:
                    <input type="text" value={idade} onChange={(event) => setIdade(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Cargo:
                    <input type="text" value={endereco} onChange={(event) => setEndereco(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Salário:
                    <input type="number" value={telefone} onChange={(event) => setTelefone(event.target.value)} required/>
                </label>
                <br />
                <Link href="/">
                    <button type="submit">Enviar</button>
                </Link>
            </form>
            {erro && <div>{erro}</div>}
        </div>
)
}