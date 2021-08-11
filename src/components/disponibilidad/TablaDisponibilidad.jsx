import React, { Fragment, useState, useEffect } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiOutlineReload } from "react-icons/ai";
import axiosClient from "../../config/axios";
import AlertCargando from "../../singles/AlertCargando";
import AlertError from "../../singles/AlertError";
import AlertExito from "../../singles/AlertExito";
import SelectSiNo from "../../singles/SelectSiNo";
const TablaDisponibilidad = () => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(true);
  const [curp, setCurp] = useState();
  const [state, setState] = useState({ disponible: null, referencia: null });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reload) {
      AlertCargando("Cargando información");
      axiosClient({
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}disponible_candidatos`,
        data: { curp: curp ? curp : "" },
      }).then(async ({ data: { data } }) => {
        await setData(data);
        AlertExito(
          "Se han cargado los candidatos disponibles"
        );
      });
      setCurp("");
      setReload(false);
    }
  }, [reload, curp]);

  const setDisponibilidad = ({ id }) => {
    setState({ ...state, idCandidato: id });
    handleShow();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInfo = (input) => {
    setState({ ...state, [input.target.name]: input.target.value });
  };

  const columns = [
    {
      name: "Seleccionar Disponibilidad",
      wrap: true,
      button: true,
      minWidth: "180px",
      cell: (row) =>
        row.asignado === "1" ? (
          <Button
            size="sm"
            disabled={true}
            variant="dark"
            onClick={() => setDisponibilidad(row)}
          >
            Disponibilidad
          </Button>
        ) : (
          <Button
            size="sm"
            variant="info"
            onClick={() => setDisponibilidad(row)}
          >
            Disponibilidad
          </Button>
        ),
    },
    {
      name: "CURP",
      selector: "curp_brigadista",
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
      name: "Puesto",
      selector: "posicion_candidato",
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
      name: "Estatus",
      selector: "disponible",
      wrap: false,
      minWidth: "200px",
      cell: (row) =>
        row.asignado === "1" ? (
          <label className=" p-2 mt-1 rounded bg-secondary text-white">
            No Disponible/Asignado
          </label>
        ) : row.disponible === "1" ? (
          <label className=" p-2 mt-1 rounded bg-success text-white">
            Disponible/Sin Asignar
          </label>
        ) : row.disponible === "0" ? (
          <label className=" p-2 mt-1 rounded bg-danger text-white">
            No Disponible
          </label>
        ) : (
          <label className=" p-2 mt-1 rounded bg-secondary text-white">
            Por definir
          </label>
        ),
    },
  ];

  const onSubmit = () => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEN_URL}asignarDisponibilidadCandidato`,
      data: { data: state },
    };
    if (!state.disponible) {
      AlertError("Campo vacio", "Debe selecionar al menos una opción SI o NO.");
    } else if (state.disponible === "0") {
      if (!state.referencia) {
        AlertError(
          "Campo vacio",
          "Deber de agregar la referencia por lo cual no esta disponible"
        );
      } else {
        handleClose();
        AlertCargando("Guardando disponibilidad del Usuario");
        axiosClient(config).then((resp) => {
          if (resp.status === 200) {
            AlertExito("Guardado Correctamente");
            setReload(true);
            setState({ disponible: null, referencia: null });
          }
        });
      }
    } else {
      handleClose();
      AlertCargando("Guardando disponibilidad del Usuario");
      axiosClient(config).then((resp) => {
        if (resp.status === 200) {
          AlertExito("Guardado Correctamente");
          setReload(true);
        }
      });
    }
  };

  return (
    <Fragment>
      <div style={{ alignContent: "right" }}>
        <h3>Disponibilidad: Oficinas Centrales</h3>
      </div>
      <InputGroup className="mb-2 pt-4">
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              onChange={(input) => setCurp(input.target.value)}
              className="mb-2 px-5"
              placeholder="Buscar..."
            />
          </Col>
          <Col xs="auto">
            <Button className="mb-2" onClick={() => setReload(true)}>
              Buscar
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              className="mb-2"
              variant="info"
              onClick={() => setReload(true)}
            >
              <AiOutlineReload />
            </Button>
          </Col>
        </Form.Row>
      </InputGroup>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="small"
        aria-labelledby="contained-modal-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Disponibilidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row body_wrap pb-4">
            <div className="col-5 col-md-5">
              <label className="control-label">Disponible:</label>
              <SelectSiNo
                className={`form-control ${
                  state.disponible ? state.disponible : "myInput"
                }`}
                name="disponible"
                defaultValue={state.disponible}
                onChange={setInfo}
              />
            </div>
            {state.disponible === "0" && (
              <>
                <div className="col-7 col-md-7">
                  <label className="control-label">Referencia:</label>
                  <input
                    className={`form-control ${
                      state.referancia ? state.referencia : "myInput"
                    }`}
                    name="referencia"
                    defaultValue={state.referencia}
                    onChange={setInfo}
                    minLength={0}
                    maxLength={255}
                    type="text"
                    placeholder="Ingresa la referencia por la cual no esta disponible"
                  />
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="m-0 row justify-content-center align-items-center">
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => onSubmit()}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <DataTable
        title="Candidatos disponibles para asignación de disponibilidad"
        columns={columns}
        data={data}
        defaultSortField="curp"
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos",
        }}
        persistTableHead
        progressPending={false}
        contextMessage={{
          singular: "registro",
          plural: "registros",
          message: "seleccionados",
        }}
        subHeaderAlign={"left"}
        pagination
      />
    </Fragment>
  );
};

export default TablaDisponibilidad;
