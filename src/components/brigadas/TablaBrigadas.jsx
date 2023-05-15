import React, { Fragment, useEffect, useState, useContext } from 'react'
import { Button, Form, Col, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AlertError from '../../singles/AlertError'
import AlertExito from '../../singles/AlertExito'
import AlertCargando from '../../singles/AlertCargando'
import EvaluacionDesepenio from './EvaluacionDesepenio';
import sessionContext from "../../context/session/sessionContext";
import { postBrigades, postRealeaseBrigadesCandidate } from '../../services/brigades/BrigadesService';
import { AiOutlineReload, AiOutlineSync } from 'react-icons/ai';

const TablaBrigadas = () => {


    const sessContext = useContext(sessionContext)
    const [showEvaluacion, setShowEvaluacion] = useState(false)
    const [reload, setReload] = useState(true)
    const [brigadistaSelected, setBrigadistaSelected] = useState({})
    const [brigadistas, setBrigadistas] = useState([])
    const [search, setSearch] = useState("");
    const { user } = sessContext.login;

    useEffect(() => {

        if (reload) {
            AlertCargando('Cargando información');
            postBrigades({ ...user, search }).then((resp) => {
                if (resp.status === 200) {
                    setBrigadistas(resp.data)
                    setReload(false);
                    AlertExito('¡Información cargada con exito!')
                }
            }).catch((error) => {
                AlertError("Error", error.responseJSON);
            });
        }

    }, [reload]);

    const mostrarEvaluacionBrigadista = row => {
        setBrigadistaSelected(row)
        /* si tiene variable de edicion, consultar datos */
        setShowEvaluacion(true)
    }

    const handleSearch = ({ target }) => {
        setSearch(target.value);
    }

    const handleRefresh = () => {
        setSearch("");
        setReload(true);
    }

    const handleRelease = async () => {
        AlertCargando('Verificando si hay candidatos disponibles para liberar');
        await postRealeaseBrigadesCandidate().then((resp) => {
            if (resp.status === 200) {
                AlertExito(resp.data.msg);

                setTimeout(() => {
                    setReload(true);
                }, [1000])
            }
        }).catch((error) => {
            AlertError("Error", error.responseJSON);
        });
    }

    /* CONFIGURACIONES TABLA */
    // PARA ESTE CASO SE MODIFICÓ EL PUESTO EN LA VISTA DEL BACKEND
    const columns = [
        {
            name: 'Acciones',
            wrap: true,
            button: true,
            minWidth: '180px',
            sortable: true,
            /* enviar a evaluacion del brigadista */
            cell: (row) => (row.status_evaluacion === 'evaluado') ?
                <Button className='btn btn-block btn-info' onClick={() => mostrarEvaluacionBrigadista(row)}>Ver evaluación</Button>
                :
                <Button className='btn btn-block btn-success' onClick={() => mostrarEvaluacionBrigadista(row)}>Evaluar</Button>
            ,
        },
        {
            name: 'CURP',
            selector: 'curp',
            wrap: false,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Nombre',
            selector: 'nombres',
            wrap: false,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Puesto',
            selector: 'posicion_candidato',
            wrap: false,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Estado',
            selector: 'nom_ent',
            wrap: false,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Estatus',
            selector: 'status_evaluacion',
            wrap: false,
            minWidth: '200px',
            sortable: true
        }

    ]

    return (
        <Fragment>
            {
                showEvaluacion ?
                    <Fragment>
                        <EvaluacionDesepenio
                            data={brigadistaSelected}
                            backTable={() => setShowEvaluacion(false)}
                            setReload={setReload}
                            reload={reload}
                        />
                    </Fragment>
                    :
                    <Fragment>
                        {/* Mostrar en una tabla, los brigadistas petenecientes a la cuenta entrante */}
                        <div style={{ alignContent: 'right' }}><h3>Brigada: {''}</h3></div>
                        <InputGroup className="mb-2 pt-4">
                            <Form.Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Control
                                        value={search ? search : ""}
                                        onChange={handleSearch}
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
                                        onClick={handleRefresh}
                                    >
                                        <AiOutlineReload />
                                    </Button>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        className="mb-2"
                                        variant="info"
                                        onClick={handleRelease}
                                    >
                                        <AiOutlineSync />
                                    </Button>
                                </Col>
                            </Form.Row>
                        </InputGroup>
                        <DataTable
                            title="Evaluación de Candidatos"
                            columns={columns}
                            data={brigadistas}
                            defaultSortField="curp"
                            paginationComponentOptions={
                                {
                                    rowsPerPageText: 'Filas por página',
                                    rangeSeparatorText: 'de',
                                    selectAllRowsItem: true,
                                    selectAllRowsItemText: 'Todos'
                                }
                            }
                            persistTableHead
                            progressPending={false}
                            contextMessage={{ singular: 'registro', plural: 'registros', message: 'seleccionados' }}
                            subHeaderAlign={'left'}
                            pagination
                        />
                    </Fragment>
            }
        </Fragment>
    );
}

export default TablaBrigadas;