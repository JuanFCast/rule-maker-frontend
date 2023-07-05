import React from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "reactstrap";
import TableRule from '../components/TableRule';
import UpdateRule from '../components/UpdateRule';
import InsertRule from '../components/InsertRule';

const data = [
  { id: 1, Rules: "Columna 1 ES MAYOR QUE 18 Y Columna 3 ES IGUAL A Antioquia" },
  { id: 2, Rules: "(Columna 2 ES IGUAL A Rojo Y Columna 2 ES DIFERENTE A Columna 3) Ó Columna 4 ES verdadera" }
];

class CRUD_rules extends React.Component {
  state = {
    data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Rules: ""
    },
  };

  mostrarModalActualizar = (dato) => {
    getRules();
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      form: {
        id: "",
        Rules: ""
      },
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    const arreglo = this.state.data.map(item => item.id === dato.id ? dato : item);
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    if (window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id)) {
      const arreglo = this.state.data.filter(item => item.id !== dato.id);
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    const lista = [...this.state.data, valorNuevo];
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { data, form, modalActualizar, modalInsertar } = this.state;

    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Insertar nueva regla</Button>
          <br />
          <br />
          <TableRule data={data} mostrarModalActualizar={this.mostrarModalActualizar} eliminar={this.eliminar} />
        </Container>
        
        <UpdateRule isOpen={modalActualizar} form={form} cerrarModalActualizar={this.cerrarModalActualizar} handleChange={this.handleChange} editar={this.editar} />
        <InsertRule isOpen={modalInsertar} form={form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

async function getRules(){
  const baseUrl = "http://localhost:8080";
  let response = "";
  
    try {
      response = await axios.get(
        baseUrl + "/rule/getAll",
        {
          headers: {
            "MediaType": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  return response.data;
}

export default CRUD_rules;
