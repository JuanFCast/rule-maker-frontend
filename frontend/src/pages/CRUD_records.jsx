import React from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Input } from "reactstrap";
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
    void:{},
    columnKey:"name",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const baseUrl = "http://localhost:8080";
    await axios.get(
      baseUrl + "/table/columns",
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
    ).then(
      (responseColumns)=>{
        let newForm={};
        responseColumns.data.forEach(
          column=>{
            
            newForm[column["id"]["name"]]=""
          }
        );
        this.setState({ form:newForm,void:newForm});
      }
    );
    try {
      await axios.get(
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
      ).then(
        (response)=>{
          if (response.data.data && response.data.data.length > 0) {
            this.setState({ data: response.data.data});
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  

  mostrarModalActualizar = (dato) => {
    let newForm=this.state.void;
    Object.keys(newForm).forEach(
      key=>{
        newForm[key]=dato[key]
      }
    )
    this.setState({
      form: newForm,
      prev:dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      form:this.state.void,
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

  handleChangeKey = (e) => {
    this.setState({ newColumnKey: e.target.value });
  }

  handleClickKey = () => {
    this.setState({ columnKey: this.state.newColumnKey });
  }

  render() {
    const { data, form, modalActualizar, modalInsertar ,prev} = this.state;

    return (
      <>
        <Container>
          <br />
          <Input type="text" value={this.state.newColumnKey} onChange={this.handleChangeKey} />
          <Button onClick={this.handleClickKey}>Cambiar Key</Button>
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
