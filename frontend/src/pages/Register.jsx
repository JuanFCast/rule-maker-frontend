import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpeg';

import styles from "../style/styles.module.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    correo: "",
    contraseña: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { contraseña, correo, firstName, lastName, phoneNumber } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (contraseña !== "" && correo !== "" && firstName !== "" && lastName !== "" && phoneNumber !== "") {
      const Usuario = {
        correo,
        contraseña,
        firstName,
        lastName,
        phoneNumber
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/create", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ contraseña: "", correo: "", firstName: "", lastName: "", phoneNumber: "" });
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.logoTitleContainer}>
          <h3>Motor de Reglas by</h3>
          <img src={logo} alt="Logo de Perficient" className={styles.logo} />
        </div>
        <h2>Crear cuenta</h2>
        <form onSubmit={(e) => onSubmit(e)}>

          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="firstName">Nombre</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={firstName}
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Nombre..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="lastName">Apellido</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={lastName}
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Apellido..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="correo">Correo</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={correo}
                name="correo"
                id="correo"
                type="email"
                placeholder="Correo..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="contraseña">Contraseña</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={contraseña}
                name="contraseña"
                id="contraseña"
                type="password"
                placeholder="Contraseña..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="phoneNumber">Telefono</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                type="text"
                placeholder="Telefono..."
                autoComplete="off"
              />
            </div>
          </div>

          <button type="submit">Crear cuenta</button>
          <p>{mensaje}</p>
        </form>
      </div>
    </>
  );
};

export default Register;
