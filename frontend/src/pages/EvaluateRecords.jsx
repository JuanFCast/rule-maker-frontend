import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EvaluateRecords = () => {
  const [data, setData] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const baseUrl = "http://localhost:8080";
    let response = "";
    try {
      axios.get(
        baseUrl + "/table/get",
        {
          params: {
            groupId: "MyGroup",
            tableId: 1
          },
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "MediaType": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      ).then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      });

      axios.get(
        baseUrl + "/rule/getAll",
        {
          headers: {
            "MediaType": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      ).then((response) => {
        console.log(response.data);
        setRules(response.data);
      });

  // Aquí está tu nueva línea de código
  response.data.data.forEach(objeto => { delete objeto._class; });

  console.log(response.data.data);

  if (response.data.data && response.data.data.length > 0) {
    const form = {};
    Object.keys(response.data.data[0]).forEach(key => form[key] = '');
    this.setState({ data: response.data.data, form });
  }
} catch (error) {
  console.error(error);
}    
  }, []);

const handleDataSelection = (data) => {
  setSelectedData(data);
}

const handleRuleSelection = (index) => {
  setSelectedRuleIndex(index);
}

const applyRule = () => {
  // Aquí es donde se necesita implementar la lógica para evaluar la regla seleccionada en los datos seleccionados
  // La implementación exacta depende de cómo estén estructuradas las reglas y de qué tipo de lógica quieran permitir
  const result = "Verdadero"; // Este es un valor de demostración
  setResult(`Al evaluar el registro ${selectedData.ID} contra la regla ${selectedRuleIndex + 1}, el resultado es ${result}.`);
}

return (
  <div>
    <h1>Motor de reglas</h1>

    <h2>Selecciona un registro</h2>
    <table>
      <thead>
        <tr>
          {data.length > 0 && Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleDataSelection(row)}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Selecciona una regla</h2>
    <ul>
      {rules.map((rule, index) => (
        <li key={index} onClick={() => handleRuleSelection(index)}>{rule.name}</li>
      ))}
    </ul>

    <button onClick={applyRule}>Aplicar regla</button>

    {result !== null && <p>{result}</p>}
  </div>
);
}

export default EvaluateRecords;
