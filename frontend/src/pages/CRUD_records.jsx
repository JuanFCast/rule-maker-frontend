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
    form: {},
    prev:{},
    columnKey:"name",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const baseUrl = "http://localhost:8080";
  
    try {
      const response = await axios.get(
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
      );
  
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
  };
  
  

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      prev:dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    console.log(this.state.data[0])
    const form = this.state.data.length > 0 ? this.state.data[0] : {};
    this.setState({
      form,
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = async (prev,dato) => {
    // Aquí tendrías que hacer una solicitud PUT o PATCH a tu backend para actualizar el registro
    // Por ahora, actualizamos solo el estado local
    const baseUrl = "http://localhost:8080/table/update";
    const column=this.state.columnKey;
    console.log(prev)
    axios.put(baseUrl, {
      groupId: "MyGroup",
      tableId: 1,
      toUpdate:dato,
      key: column,
      value: prev[column]
    }, {
      headers: {
        "Access-Control-Allow-Origin": baseUrl,
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
    window.location.reload();
  };

  eliminar = async (dato) => {
    if (window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato[this.state.columnKey])) {
      // Aquí tendrías que hacer una solicitud DELETE a tu backend para eliminar el registro
      // Por ahora, eliminamos solo del estado local
      const baseUrl = "http://localhost:8080/table/delete";
      const column=this.state.columnKey;
      axios.delete(baseUrl,
        {
          data:{
          groupId: "MyGroup",
          tableId: 1,
          toUpdate:dato,
          key: column,
          value: dato[column]
          },
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
      })
      window.location.reload();
    }
  };

  insertar = async () => {
    const valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    // Aquí tendrías que hacer una solicitud POST a tu backend para insertar el nuevo registro
    // Por ahora, insertamos solo en el estado local
    const lista = [...this.state.data, valorNuevo];
    const dato=this.state.form
    this.setState({ modalInsertar: false, data: lista });
    const baseUrl = "http://localhost:8080/table/create";
      const column=this.state.columnKey;
      
      axios.post(baseUrl,
        {
          groupId: "MyGroup",
          tableId: 1,
          toUpdate:dato,
          key: column,
          value: dato[column]
        },
        {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
      })
      window.location.reload();
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
    const { data, form, modalActualizar, modalInsertar ,prev} = this.state;

    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Insertar nuevo registro</Button>
          <br />
          <br />
          <TableRecords data={data} mostrarModalActualizar={this.mostrarModalActualizar} eliminar={this.eliminar} />
        </Container>

        <UpdateRecordModal isOpen={modalActualizar} form={form} cerrarModalActualizar={this.cerrarModalActualizar} handleChange={this.handleChange} editar={this.editar} prevValue={prev}/>
        <InsertRecordModal isOpen={modalInsertar} form={form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

export default CRUD_records;
