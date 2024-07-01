"use client"

import Navbar from "@/app/components/Navbar";
import React, { useState } from 'react';
import axios from "axios";
import '../styles/form.css'
import { useRouter } from "next/router";
import Link from "next/link";


export default function home() {
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');
    const [erro, setErro] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/Funcionario",{
                nome,
                cargo,
                salario
            })
            if(response.data.status && response.data.codigo === "002"){
                console.log('sucess')
        }
      }catch(err){
        setErro(err.message)
      }
    }

    return(
        <div>
            <Navbar/>
            <h1 class="formulario_titulo ">Adicionar funcionario</h1>
            <form class="formulario" onSubmit={handleSubmit}>
                <label class="formulario_label">
                    Nome:
                    <input class="formulario_input" type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
                </label>
                <br />
                <label class="formulario_label">
                    Cargo:
                    <input class="formulario_input" type="text" value={cargo} onChange={(event) => setCargo(event.target.value)} />
                </label>
                <br />
                <label class="formulario_label">
                    Salário:
                    <input class="formulario_input" type="number" value={salario} onChange={(event) => setSalario(event.target.value)} />
                </label>
                <br />
                <Link href="/" >
                    <button class="formulario_botao" type="submit">Enviar</button>
                </Link>
            </form>
            {erro && <div>{erro}</div>}
        </div>
)
}