import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import AlertError from "../../singles/AlertError";
import sessionContext from "../../context/session/sessionContext";
import AlertExito from "../../singles/AlertExito";
import AlertCargando from "../../singles/AlertCargando";
import S9_S10 from "./S9_S10";
import S9_S10View from "./S9_S10View";
import { AiOutlineReload } from "react-icons/ai";
import InfomacionCandidato from "./InfomacionCandidato";


const TablaEstatales = () => {
  const sessContext = useContext(sessionContext);
  const API_REQUEST = process.env.REACT_APP_BACKEND_URL;

  const [reload, setReload] = useState(true);
  const [showPruebas, setShowPruebas] = useState(false);
  const [candidatoSelected, setCandidatoSelected] = useState({});
  const [modoVista, setModoVista] = useState(false);
  const [datosTabla, setDatosTabla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");


  /* 
        TODO: consultar segun el estado del usuario que registra 
            -> columna formato condicional motivo de rechazo rojo
    */


  const getEstado = (cv_edo = "00") => {
    cv_edo = sessContext.login.user.user_type;
    const porfile = sessContext.login.user.porfile;

    if (porfile.regionales && porfile.estatales) {


      switch (cv_edo) {
        case "1":

          return "NOROESTE";

        case "2":

          return "NORTE";

        case "3":

          return "NORESTE";

        case "4":

          return "OCCIDENTE";

        case "5":

          return "CENTRO";

        case "6":

          return "SURESTE"

        default:
          return "Of. Centrales";

      }

    } else {

      switch (cv_edo) {
        case "01":
          return "Aguascalientes";
        case "02":
          return "Baja california";
        case "03":
          return "Baja california sur";
        case "04":
          return "Campeche";
        case "05":
          return "Coahuila de zaragoza";
        case "06":
          return "Colima";
        case "07":
          return "Chiapas";
        case "08":
          return "Chihuahua";
        case "09":
          return "Ciudad de méxico";
        case "10":
          return "Durango";
        case "11":
          return "Guanajuato";
        case "12":
          return "Guerrero";
        case "13":
          return "Hidalgo";
        case "14":
          return "Jalisco";
        case "15":
          return "México";
        case "16":
          return "Michoacán";
        case "17":
          return "Morelos";
        case "18":
          return "Nayarit";
        case "19":
          return "Nuevo león";
        case "20":
          return "Oaxaca";
        case "21":
          return "Puebla";
        case "22":
          return "Querétaro";
        case "23":
          return "Quintana roo";
        case "24":
          return "San luis potosí";
        case "25":
          return "Sinaloa";
        case "26":
          return "Sonora";
        case "27":
          return "Tabasco";
        case "28":
          return "Tamaulipas";
        case "29":
          return "Tlaxcala";
        case "30":
          return "Veracruz";
        case "31":
          return "Yucatán";
        case "32":
          return "Zacatecas";
        default:
          return "Of.Centrales";
      }
    }
  };

  const buscarRegistro = async () => {
    const { user } = sessContext.login;
    // const searchWord = input.target.value
    const url = `${API_REQUEST}busqueda_revision_estatal`;
    AlertCargando("Buscando similitudes...");
    setLoading(true);
    if (searchWord !== "") {
      if (user) {
        try {
          const resp = await axios.post(url, {
            busqueda: searchWord,
            email: user.email,
            token: user.token,
            user_type: user.user_type,
          });
          if (resp.status === 200) {
            setDatosTabla(resp.data);
            AlertExito("Se han cargado los registros existentes");
            setLoading(false);
          } else {
            AlertError("Error", resp.data);
          }
        } catch (error) {
          AlertError("Error", error);
        }
      }
    } else {
      getCandidatos();
    }
  };

  const getCandidatos = async () => {
    const { user } = sessContext.login;
    const url = `${API_REQUEST}revision_estatal`;
    try {
      AlertCargando("Extrayendo registros...");
      setLoading(true);
      const resp = await axios.post(url, user);
      if (resp.status === 200) {
        AlertExito("Registros cargados");
        setDatosTabla(resp.data);
        setLoading(false);
      } else {
        AlertError("Error", resp);
      }
    } catch (error) {
      AlertError("ERROR", error);
    }
  };

  const mostrarPlantillaPruebas = (data) => {
    setCandidatoSelected(data);
    setModoVista(false);
    setShowPruebas(true);
  };

  const moodVista = (data) => {
    setCandidatoSelected(data);
    setModoVista(true);
    setShowPruebas(true);
  };

  const handleRegresar = () => {
    setShowPruebas(false);
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      getCandidatos();
      setModoVista(false);
      setReload(false);
    }
    return () => { }
  }, [reload]);

  /* CONFIGURACIONES TABLA */

  const getAcciones = (row) =>
    row.status ? (
      <Button variant="info" onClick={() => moodVista(row)}>
        Ver
      </Button>
    ) : (
      <Button variant="success" onClick={() => mostrarPlantillaPruebas(row)}>
        Agregar Pruebas
      </Button>
    );

  const getEstatus = (row) => {
    /* SI NO TIENE STATUS NI RECHAZO; ESTA PENDIENTE */
    if (!row.status && !row.rechazo) {
      return null;
    }
    /* SI TIENE STATUS Y NO TIENE RECHAZO, ESTA COMPLETO */
    if (row.status && !row.rechazo) {
      return "completo";
    }
    /* SI TIENE RECHAZO RETORNA RECHAZO */
    if (row.rechazo) {
      return row.rechazo;
    }
  };

  const columns = [
    {
      name: "Acciones",
      wrap: true,
      button: true,
      minWidth: "180px",
      cell: (row) => getAcciones(row),
    },
    {
      name: "CURP",
      selector: "curp",
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: "nombres",
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "Estado",
      selector: "nom_ent",
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "Municipio",
      selector: "municipio",
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "Posición",
      selector: "posicion_candidato",
      wrap: false,
      minWidth: "200px",
      sortable: true,
    },
    {
      name: "Estatus",
      selector: "rechazo",
      wrap: false,
      minWidth: "200px",
      sortable: true,
      cell: (row) => getEstatus(row),
    },
  ];



  const conditionalRowStyles = [
    {
      when: (row) => row.rechazo,
      style: {
        backgroundColor: "#A01F3F",
        // backgroundColor: '#D69200',
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <div>
      {showPruebas ? (
        <React.Fragment>
          <button
            className="btn btn-danger"
            onClick={() => setShowPruebas(false)}
          >
            Volver
          </button>
          <InfomacionCandidato state={candidatoSelected} />
          {modoVista ? (
            // eslint-disable-next-line react/jsx-pascal-case
            <S9_S10View
              setVolver={handleRegresar}
              infoCandidato={candidatoSelected}
            />
          ) : (
            <S9_S10
              setVolver={handleRegresar}
              infoCandidato={candidatoSelected}
            />
          )}
        </React.Fragment>
      ) : (
        <>
          <div style={{ alignContent: "right" }}>
            <h3>Estado: {getEstado()}</h3>
          </div>
          <InputGroup className="mb-2 pt-4">
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  onChange={(input) => setSearchWord(input.target.value)}
                  className="mb-2 px-5"
                  value={searchWord}
                  placeholder="Buscar..."
                />
              </Col>
              <Col xs="auto">
                <Button className="mb-2" onClick={buscarRegistro}>
                  Buscar
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="mb-2"
                  variant="info"
                  onClick={() => {
                    setSearchWord("");
                    setReload(true);
                  }}
                >
                  <AiOutlineReload />
                </Button>
              </Col>
            </Form.Row>
          </InputGroup>
          <DataTable
            title="Candidatos para pruebas físicas"
            columns={columns}
            data={datosTabla}
            defaultSortField="curp"
            paginationComponentOptions={{
              rowsPerPageText: "Filas por página",
              rangeSeparatorText: "de",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Todos",
            }}
            persistTableHead
            progressPending={loading}
            contextMessage={{
              singular: "registro",
              plural: "registros",
              message: "seleccionados",
            }}
            subHeaderAlign={"left"}
            conditionalRowStyles={conditionalRowStyles}
            pagination
          />
        </>
      )}
    </div>
  );
};

export default TablaEstatales;
