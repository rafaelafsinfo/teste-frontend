"use client";

import "../styles/datatable.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterColumn, setFilterColumn] = useState("id ");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setoriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/Funcionario/");
      const apiData = response.data;
      if (apiData.status) {
        const dados = apiData.dados;
        setoriginalData(apiData.dados);
        const columns = Object.keys(dados[0]).map((key) => ({
          id: key,
          header: key,
        }));
        setData(dados);
        setColumns(columns);
        setFilteredData(dados);
      } else {
        console.error("Erro ao carregar dados:", apiData.msg);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterColumn(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    const filterValue = event.target.value;

    setFilterValue(filterValue);

    if (!filterValue) {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((row) => {
        return row[filterColumn]
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });

      setData(filteredData);
    }
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`http://localhost:5000/Funcionario/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div class="filter">
            <select
              value={filterColumn}
              onChange={handleFilterChange}
              class="select-container"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.header}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder="Digite o valor de filtro"
              class="input-container"
            />
          </div>
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.id}>{column.header}</th>
                ))}
                <th>Perfil</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.id}>{row[column.id]}</td>
                  ))}
                  <td>
                    <Link href={`/perfil/${row.id}`}>ver perfil</Link>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteClick(row.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
