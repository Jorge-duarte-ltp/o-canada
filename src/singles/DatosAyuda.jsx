import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import { FcAssistant, FcVoicePresentation } from 'react-icons/fc';

const DatosAyuda = ({ setShow, show }) => {

    const contactosIncendios = [
        { region: 'Noroeste', nombre: 'Rodrigo Contreras Armenta', telefono: '(662) 260 4977   ||   (662) 262 0918 ', celular: '(662) 299 7566', extension: '9780', correo: 'rcontreras@conafor.gob.mx' },
        { region: 'Norte', nombre: 'Oscar René Domínguez Moreno', telefono: '(618) 827 9833', celular: '(618) 176 2691', extension: '9790', correo: 'odominguez@conafor.gob.mx' },
        { region: 'Noreste', nombre: 'Jorge Alberto Serna Zamarron', telefono: '(844) 488 3500   ||   (844) 488 1668', celular: '(844) 505 9093', extension: '9770', correo: 'jorge.serna@conafor.gob.mx' },
        { region: 'Occidente', nombre: 'Juvenal Rodríguez Villa', telefono: '(341) 122 5490', celular: '(342) 108 9394', extension: '9760', correo: 'juvenal.rodriguez@conafor.gob.mx' },
        { region: 'Centro', nombre: 'Ismael Solórzano Ibarra', telefono: '(222) 291 4377   ||   (222) 291 4666', celular: '(222) 564 6626', extension: '9740', correo: 'isolorzano@conafor.gob.mx' },
        { region: 'Sureste', nombre: 'Pánfilo Fernández Flores', telefono: '(981) 811 4417', celular: '(981) 207 5900', extension: '9750', correo: 'pfernandez@conafor.gob.mx' },
    ]
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton className="colorInst">
                <Modal.Title>Asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='px-5'>
                    <p>
                        <IconContext.Provider value={{ size: "2em" }}>
                            <FcAssistant />
                        </IconContext.Provider>
                                 Si tiene alguna <b>falla</b> respecto al <b>sistema</b>, puede comunicarse
                                directamente a la Mesa de Ayuda marcando al teléfono
                                <b>(33)3777-7000</b> ext. <b>4505</b>, <b>4425 </b> o <b>4508</b>.
                    </p>
                </div>
                <hr />
                <div className='px-5'>
                    <p>
                        <IconContext.Provider value={{ size: "2em" }}>
                            <FcVoicePresentation />
                        </IconContext.Provider>
                                 Si tiene alguna duda respecto a <b>como capturar un campo</b> comuniquese directamente:
                        <br />
                        <br />
                        {/* <br /> */}
                        <div className='table-responsive'>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">REGIÓN</th>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">TEL. DIRECTO</th>
                                        <th scope="col">Cel. / Particular</th>
                                        <th scope="col">EXT.</th>
                                        <th scope="col">CORREO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactosIncendios.map((item, index) => <tr key={index}>
                                        <th scope="row">{item.region}</th>
                                        <td>{item.nombre}</td>
                                        <td>{item.telefono}</td>
                                        <td>{item.celular}</td>
                                        <td>{item.extension}</td>
                                        <td><a href={`mailto:${item.correo}`}>{item.correo}</a></td>
                                    </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button className="newDanger" variant="danger" onClick={() => setShow(false)}>
                    Cerrar
                        </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default DatosAyuda;