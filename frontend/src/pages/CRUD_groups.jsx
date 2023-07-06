import React from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "reactstrap";
import TableGroup from '../components/TableGroup';
import UpdateGroup from '../components/UpdateGroup';
import InsertGroup from '../components/InsertGroup';


class CRUD_columns extends React.Component {
  state = {
    data:[],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: ""
    },
  };

  async componentDidMount() {
    const groups = await this.getGroups();
    console.log(groups)
    this.setState({ data: groups });

  }

  async getGroups() {
    const baseUrl = "http://localhost:8080";
    let response = "";
    const userID = jwt_decode(localStorage.getItem('jwt'))["userId"];
    try {
      response = await axios.get(
        baseUrl + "/group/Mygroups",
        {
          params:{
            userId:userID
          },
          headers: {
            "MediaType": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      );
    } catch (error) {
      console.error(error);
      return [];
    }
    return response.data.map(group => {
      return {
        id: group.groupId,
      };
    });
  }

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
          <Button color="success" onClick={this.mostrarModalInsertar}>Insertar nuevo grupo</Button>
          <br />
          <br />
          <TableGroup data={data} mostrarModalActualizar={this.mostrarModalActualizar} eliminar={this.eliminar} />
        </Container>

        <UpdateGroup isOpen={modalActualizar} form={form} cerrarModalActualizar={this.cerrarModalActualizar} handleChange={this.handleChange} editar={this.editar} />
        <InsertGroup isOpen={modalInsertar} form={form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

export default CRUD_columns;
