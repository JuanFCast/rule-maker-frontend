import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "reactstrap";
import RecordsTable from '../components/RecordsTable';
import UpdateRecordModal from '../components/UpdateRecordModal';
import InsertRecordModal from '../components/InsertRecordModal';

const data = [
  { id: 1, columna1: "53", columna2: "Amarillo", columna3: "Antioquia", columna4: "false" },
  { id: 2, columna1: "36", columna2: "Azul", columna3: "Cordoba", columna4: "true" },
  { id: 2, columna1: "46", columna2: "Rojo", columna3: "Nariño", columna4: "false" }
];

class CRUD_records extends React.Component {
  state = {
    data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      columna1: "",
      columna2: "",
      columna3: "",
      columna4: ""  // Nuevo campo
    },
  };

  mostrarModalActualizar = (dato) => {
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
        columna1: "",
        columna2: "",
        columna3: "",
        columna4: ""  // Nuevo campo
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
          <Button color="success" onClick={this.mostrarModalInsertar}>Insertar nuevo registro</Button>
          <br />
          <br />
          <RecordsTable data={data} mostrarModalActualizar={this.mostrarModalActualizar} eliminar={this.eliminar} />
        </Container>

        <UpdateRecordModal isOpen={modalActualizar} form={form} cerrarModalActualizar={this.cerrarModalActualizar} handleChange={this.handleChange} editar={this.editar} />
        <InsertRecordModal isOpen={modalInsertar} form={form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

export default CRUD_records;
