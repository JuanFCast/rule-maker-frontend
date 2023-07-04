import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CRUD_records from "./pages/CRUD_records";
import CRUD_rules from "./pages/CRUD_rules";
import CRUD_columns from "./pages/CRUD_columns";
import CRUD_groups from "./pages/CRUD_groups";

import styles from './App.module.scss'

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CRUD_records" element={<CRUD_records />} />
          <Route path="/CRUD_rules" element={<CRUD_rules />} />
          <Route path="/CRUD_columns" element={<CRUD_columns />} />
          <Route path="/CRUD_groups" element={<CRUD_groups />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;