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
    console.log(userID)
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
    const newForm={
      groupId: "",
      members:[],
      description:"",
      name:""
    }
    this.setState({
      form: {
        groupId: "",
        members:[],
        description:"",
        name:""
      },
      modalInsertar: true,
    });
    this.state.form=newForm
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    const baseUrl = "http://localhost:8080/group/"+dato.groupId;
        axios.put(baseUrl, {
          groupId: dato.groupId,
          members:dato.members,
          description:dato.description,
          name:dato.name

        }, {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        })
  };

  eliminar = (dato) => {
    if (window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id)) {
      const baseUrl = "http://localhost:8080/group/"+dato.id;
      axios.delete(baseUrl,
        {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
      })
      window.location.reload();
    }
  };

  insertar = () => {
    const baseUrl = "http://localhost:8080/group/";
    const dato=this.state.form
    axios.post(baseUrl,
      {
        groupId: dato.groupId,
        members:[],
        description:dato.description,
        name:dato.name
      },
      {
        headers: {
          "Access-Control-Allow-Origin": baseUrl,
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    }).then(
      (response)=>{
        const baseUrl = "http://localhost:8080/group/member";
        const userID = jwt_decode(localStorage.getItem('jwt'))["userId"];
        axios.put(baseUrl, {
          groupId: dato.groupId,
          emails: userID,
          role:"OWNER"

        }, {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        })
      }
    );
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
        <InsertGroup isOpen={modalInsertar} form={this.state.form} cerrarModalInsertar={this.cerrarModalInsertar} handleChange={this.handleChange} insertar={this.insertar} data={data} />
      </>
    );
  }
}

export default CRUD_columns;
