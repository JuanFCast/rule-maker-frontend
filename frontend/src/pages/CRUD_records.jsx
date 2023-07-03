import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "reactstrap";
import RecordsTable from '../components/RecordsTable';
import UpdateRecordModal from '../components/UpdateRecordModal';
import InsertRecordModal from '../components/InsertRecordModal';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto", poder: "Rasengan" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball", poder: "Kamehameha" },
];

class CRUD_records extends React.Component {
  state = {
    data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      personaje: "",
      anime: "",
      poder: ""
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
        personaje: "",
        anime: "",
        poder: ""
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
