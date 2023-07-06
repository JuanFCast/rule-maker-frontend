import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/App.css'; // Asegúrate de tener el archivo CSS en la misma ruta

const EvaluateRecords = () => {
  const [data, setData] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const baseUrl = "http://localhost:8080";
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
        setRules(response.data);
      });
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

  const applyRule = async () => {
    const baseUrl = "http://localhost:8080/evaluation/doEvaluation";
    const selectedRule = rules[selectedRuleIndex];
    
    let response=await axios.post(baseUrl,
      {
        data:selectedData,
        rule:{
          name:selectedRule.name,
          rule:selectedRule.rule
        }
      },
      {
        headers: {
          "Access-Control-Allow-Origin": baseUrl,
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    })
    setResult(`Al evaluar el registro ${selectedData.ID} contra la regla ${selectedRuleIndex + 1}, el resultado es ${response.data}.`);
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
            <tr key={index} 
                className={selectedData === row ? 'selected' : ''}
                onClick={() => handleDataSelection(row)}
            >
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Selecciona una regla</h2>
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Regla</th>
    </tr>
  </thead>
  <tbody>
    {rules.map((rule, index) => (
      <tr key={index} 
          className={selectedRuleIndex === index ? 'selected' : ''}
          onClick={() => handleRuleSelection(index)}
      >
        <td>{rule.name}</td>
        <td>{rule.rule}</td>
      </tr>
    ))}
  </tbody>
</table>





      <button onClick={applyRule}>Aplicar regla</button>

      {result !== null && <p>{result}</p>}
    </div>
  );
}

export default EvaluateRecords;
