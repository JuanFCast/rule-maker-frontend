import React from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "reactstrap";
import TableRecords from '../components/TableRecords';
import UpdateRecordModal from '../components/UpdateRecordModal';
import InsertRecordModal from '../components/InsertRecordModal';

class CRUD_records extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('/ruta-api');
      const data = response.data;

      if (data && data.length) {
        const form = {};
        Object.keys(data[0]).forEach(key => form[key] = '');
        this.setState({ data, form });
      }
    } catch(error) {
      console.error("Hubo un error al cargar los datos: ", error);
      // Añade aquí cualquier manejo de errores que consideres necesario
    }
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
    const form = this.state.data.length > 0 ? this.state.data[0] : {};
    this.setState({
      form,
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = async (dato) => {
    // Aquí tendrías que hacer una solicitud PUT o PATCH a tu backend para actualizar el registro
    // Por ahora, actualizamos solo el estado local
    const arreglo = this.state.data.map(item => item.id === dato.id ? dato : item);
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = async (dato) => {
    if (window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id)) {
      // Aquí tendrías que hacer una solicitud DELETE a tu backend para eliminar el registro
      // Por ahora, eliminamos solo del estado local
      const arreglo = this.state.data.filter(item => item.id !== dato.id);
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = async () => {
    const valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    // Aquí tendrías que hacer una solicitud POST a tu backend para insertar el nuevo registro
    // Por ahora, insertamos solo en el estado local
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
          <TableRecords data={data} mostrarModalActualizar={this.mostrarModalActualizar} eliminar={this.eliminar} />
        </Container>

        <UpdateRecordModal isOpen={modalActualizar} form={form} cerrarModalActualizar={this.cerrarModalActualizar} handleChange={this.handleChange} editar={this.editar} />
        <InsertRecordModal isOpen={modalInsertar} form={form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

export default CRUD_records;
