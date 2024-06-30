"use client"

import '../styles/datatable.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/Funcionario/');
      const apiData = response.data;
      if (apiData.status) {
        const dados = apiData.dados;
        const columns = Object.keys(dados[0]).map((key) => ({ id: key, header: key }));
        setData(dados);
        setColumns(columns);
      } else {
        console.error('Erro ao carregar dados:', apiData.msg);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id}>{column.header}</th>
              ))}
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} >
                {columns.map((column) => (
                  <td key={column.id}>{row[column.id]}</td>
                ))}
                <Link href={`/perfil/${row.id}`}>
                ver perfil
                </Link>
              </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;