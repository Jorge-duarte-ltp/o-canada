import React from 'react'

const SCI100 = (props) => {
    const { state, setState  } = props

    const setInfo = (input) => {
        /* setea al state las variables */
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }
    return (
        <div className='row'>
            {/* 1. Mando es: */}
            <div className='col-12'>
                <label className="control-label pt-2">1. Mando es:</label>
                <select
                    className="form-control myInput"
                    name='1_asegurar_comunicacion'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) La habilidad de controlar el intercambio de información dentro y entre las organizaciones involucradas en el incidente.</option>
                    <option value='b'>b) La atribución de dirigir, ordenar y/o controlar recursos.</option>
                    <option value='c'>c) Basado en el número de individuos o recursos que un solo supervisor puede manejar eficientemente durante un incidente.</option>
                    <option value='d'>d) Asumido por el individuo con el rango laboral más alto en el sitio del incidente sin importar la experiencia  o nivel de entrenamiento.</option>
                </select>
            </div>

            {/* 2. ¿Cuál función del SCI registra tiempos, la contabilidad y compras de los artículos necesarios?  */}
            <div className='col-12'>
                <label className="control-label pt-2">2. ¿Cuál función del SCI registra tiempos, la contabilidad y compras de los artículos necesarios?  </label>
                <select
                    className="form-control myInput"
                    name='2_implementando_actividades'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Operaciones.</option>
                    <option value='b'>b) Comando de Incidente.</option>
                    <option value='c'>c) Planificación.</option>
                    <option value='d'>d) Finanzas/Administración</option>
                </select>
            </div>

            {/* 3. ¿Quién tiene la responsabilidad total de manejar el incidente en el sitio? */}
            <div className='col-12'>
                <label className="control-label pt-2">3. ¿Quién tiene la responsabilidad total de manejar el incidente en el sitio?</label>
                <select
                    className="form-control myInput"
                    name='3_actividades_principales'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Comandante (s) del Incidente.</option>
                    <option value='b'>b) Ejecutivo de la Dependencia/institución</option>
                    <option value='c'>c) Manejador del Centro de Operaciones de Emergencia.</option>
                    <option value='d'>d) Jefe de la Sección de Operaciones.</option>
                </select>
            </div>

            {/* 4.¿Qué significan las siglas SCI en el Programa de Manejo del Fuego?*/}
            <div className='col-12'>
                <label className="control-label pt-2">4. La primera tarea del personal de respuesta después de ser despachado y al arribar al sitio del incidente, donde ya lo atiende un Comandante de Incidente, es:</label>
                <select
                    className="form-control myInput"
                    name='4_primera_tarea_personal'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Sistema de Calificación Integral.</option>
                    <option value='b'>b) Sistema de Comando de Incidentes.</option>
                    <option value='c'>c) Sistema de Comunicación Internacional. </option>
                    <option value='d'>d) Sistema de Certificación de Incidentes.</option>
                </select>
            </div>

            {/*    5. ¿Cuál es el rango óptimo de Alcance de Control? */}
            <div className='col-12'>
                <label className="control-label pt-2">  5. ¿Cuál es el rango óptimo de Alcance de Control?</label>
                <select
                    className="form-control myInput"
                    name='5_instalacion_incidente'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) 1 a 5.</option>
                    <option value='b'>b) 1 a 3.</option>
                    <option value='c'>c) 1 a 7.</option>
                    <option value='d'>d) 1 a 10.</option>
                </select>
            </div>

            {/*   6. ¿Qué significa desmovilización? */}
            <div className='col-12'>
                <label className="control-label pt-2">  6. ¿Qué significa desmovilización?</label>
                <select
                    className="form-control myInput"
                    name='6_equipo_intervencion'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Recibir la indicación de llegar al puesto de mando después de combatir el incendio forestal.</option>
                    <option value='b'>b) Recibir la orden de desmovilización a sus secciones de trabajo.</option>
                    <option value='c'>c) Regreso ordenado, seguro y eficiente de un recurso en un incidente, evento, operativo, emergencia o desastre, a su ubicación y estado original.</option>
                    <option value='d'>d) Ninguna.</option>
                </select>
            </div>

            {/*  7. ¿Qué es un Plan de Acción del Incidente (PAI)? */}
            <div className='col-12'>
                <label className="control-label pt-2"> 7. ¿Qué es un Plan de Acción del Incidente (PAI)?</label>
                <select
                    className="form-control myInput"
                    name='7_incidente_complejo'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) El Plan que es mantenido para responder a una amplia variedad de peligros potenciales.  </option>
                    <option value='b'>b) Revisión posterior a la acción del combate del incendio forestal.</option>
                    <option value='c'>c) Un Plan desarrollado para restaurar el área o comunidad afectada.</option>
                    <option value='d'>d)  El Plan oral o escrito de los objetivos, estrategias operacionales, tácticas, recursos y estructura organizacional a cumplir durante un periodo operacional para controlar un incidente, evento u operativo. </option>
                </select>
            </div>

            {/* 8. ¿En qué formato del PAI puede encontrar la lista de asignaciones tácticas del incidente para el periodo operacional? */}
            <div className='col-12'>
                <label className="control-label pt-2">8. ¿En qué formato del PAI puede encontrar la lista de asignaciones tácticas del incidente para el periodo operacional?</label>
                <select
                    className="form-control myInput"
                    name='8_retirarse_incidente'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) SCI-204.</option>
                    <option value='b'>b) SCI-202.</option>
                    <option value='c'>c) SCI-205.</option>
                    <option value='d'>d) SCI-206.</option>
                </select>
            </div>

            {/* 9. ¿Qué es la transferencia de mando? */}
            <div className='col-12'>
                <label className="control-label pt-2">9. ¿Qué es la transferencia de mando?</label>
                <select
                    className="form-control myInput"
                    name='9_alcance_control'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) El proceso de trasladar la responsabilidad de mando del incidente de un Comandante del Incidente a otro.</option>
                    <option value='b'>b) Trasladar al personal de combate a su División de trabajo.</option>
                    <option value='c'>c) Trasladar el Puesto de Comando a otro lugar de trabajo.</option>
                    <option value='d'>d) Ninguna.</option>
                </select>
            </div>

            {/* 10. La cadena de mando se refiere a: */}
            <div className='col-12'>
                <label className="control-label pt-2">10. La cadena de mando se refiere a:</label>
                <select
                    className="form-control myInput"
                    name='10_entidades_organizacionales'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Dar indicaciones sobre asignaciones recibidas por el oficial de información pública.</option>
                    <option value='b'>b) Seguir la línea formal de comunicación para recibir instrucciones de su supervisor.</option>
                    <option value='c'>c) Recibir instrucciones y asignaciones de la brigada que trabaja junto a su brigada.</option>
                    <option value='d'>d) La Revisión Después de la Acción al término de una asignación.</option>
                </select>
            </div>

            {/* 11. Al momento de establecer los objetivos para atender un incidente, ¿Cuál es la primera prioridad? */}
            <div className='col-12'>

                <label className="control-label pt-2">11. Al momento de establecer los objetivos para atender un incidente, ¿Cuál es la primera prioridad?</label>
                <select
                    className="form-control myInput"
                    name='11_sistema_comando'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Que el incendio afecte la menor superficie posible.</option>
                    <option value='b'>b) Proteger las propiedades.</option>
                    <option value='c'>c) Controlar y liquidar el incendio lo antes posible.</option>
                    <option value='d'>d) La seguridad del personal.</option>
                </select>
            </div>

            {/* 12. ¿Qué es una helibase? */}
            <div className='col-12'>
                <label className="control-label pt-2">12. ¿Qué es una helibase?</label>
                <select
                    className="form-control myInput"
                    name='12_contiene_informacion'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Sitio seguro para instalación de campamentos de combatientes.</option>
                    <option value='b'>b) Es el lugar más temporal en el incidente, donde los helicópteros pueden aterrizar y despegar de manera segura para trasladar combatientes y suministros.</option>
                    <option value='c'>c) Es la ubicación desde la que los helicópteros se centran para llevar a cabo las operaciones. Aéreas y pueden recibir mantenimiento.</option>
                    <option value='d'>d) Es la ubicación desde donde las funciones administrativas y logísticas primarias son coordinadas y administradas.</option>
                </select>
            </div>

            {/*  13. ¿Qué incluye una sesión informativa? */}
            <div className='col-12'>
                <label className="control-label pt-2">13. ¿Qué incluye una sesión informativa?</label>
                <select
                    className="form-control myInput"
                    name='13_recursos_areas'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Evaluación de la situación actual.</option>
                    <option value='b'>b) Identificación de sus responsabilidades específicas del trabajo.</option>
                    <option value='c'>c) Las instrucciones procedentes para la obtención de recursos necesarios.</option>
                    <option value='d'>d) Todas las opciones son correctas.</option>
                </select>
            </div>

            {/* 14. ¿En qué formato del PAI puede encontrar los Objetivos del incidente para el periodo operacional? */}
            <div className='col-12'>
                <label className="control-label pt-2">14. ¿En qué formato del PAI puede encontrar los Objetivos del incidente para el periodo operacional?</label>
                <select
                    className="form-control myInput"
                    name='14_reunion_informativa'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) SCI-204.</option>
                    <option value='b'>b) SCI-202.</option>
                    <option value='c'>c) SCI-214.</option>
                    <option value='d'>d) SCI-206.</option>
                    </select>
            </div>

            {/* 15. Seleccione la opción VERDADERA: */}
            <div className='col-12'>
                <label className="control-label pt-2">15. Seleccione la opción VERDADERA:</label>
                <select
                    className="form-control myInput"
                    name='15_documento_proporciona'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) El alcance de control puede ser extendido más allá de 10 para asegurar que más recursos puedan ser desplegados en incidentes más complejos y grandes.</option>
                    <option value='b'>b) El alcance de control debe ser establecido solo en incidentes complejos o en aquellos con una duración de más de tres periodos operacionales.</option>
                    <option value='c'>c) El alcance de control consiste en organizar los recursos en Equipos, Fuerzas, Divisiones, Ramas, o Secciones.</option>
                    <option value='d'>d) El alcance de control es un factor menor de preocupación para los incidentes que son resueltos dentro el periodo operacional inicial.</option>
                </select>
            </div>

            {/* 16. ¿En qué formato del PAI puede encontrar el Plan Médico del incidente para el periodo operacional? */}
            <div className='col-12'>

                <label className="control-label pt-2">16. ¿En qué formato del PAI puede encontrar el Plan Médico del incidente para el periodo operacional?</label>
                <select
                    className="form-control myInput"
                    name='16_formato_encuentran'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) SCI-204.</option>
                    <option value='b'>b) SCI-202.</option>
                    <option value='c'>c) SCI-214.</option>
                    <option value='d'>d) SCI-206.</option>
                </select>
            </div>

            {/* 17. ¿Quién generalmente facilita la Sesión Informativa del periodo operacional? */}
            <div className='col-12'>

                <label className="control-label pt-2">17. Formato en el cual se encuentran el nombre y distancia de los hospitales cercanos al incidente</label>
                <select
                    className="form-control myInput"
                    name='17_formato_hospitales'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Oficial de Información Pública.</option>
                    <option value='b'>b) Jefe de la Sección de Logística.</option>
                    <option value='c'>c) Jefe de la Sección de Operaciones.</option>
                    <option value='d'>d) Jefe de la Sección de Planificación.</option>
                </select>
            </div>

            {/* 18. ¿Qué formato del PAI es conocido como Bitácora de Unidad y sirve para registrar actividades relevantes ocurridas en el periodo operacional? */}
            <div className='col-12'>
       
                <label className="control-label pt-2">18. ¿Qué formato del PAI es conocido como Bitácora de Unidad y sirve para registrar actividades relevantes ocurridas en el periodo operacional?</label>
                <select
                    className="form-control myInput"
                    name='18_formato_trabajo'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) SCI-204.</option>
                    <option value='b'>b) SCI-202.</option>
                    <option value='c'>c) SCI-214.</option>
                    <option value='d'>d) SCI-206.</option>
                </select>
            </div>

            {/* 19. Un individuo asumiendo el papel de Comandante de Incidente Auxiliar debe: */}
            <div className='col-12'>

                <label className="control-label pt-2">19. Un individuo asumiendo el papel de Comandante de Incidente Auxiliar debe:</label>
                <select
                    className="form-control myInput"
                    name='19_plan_accion'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) Ser un representante de la jurisdicción del incidente.</option>
                    <option value='b'>b) Tener previa experiencia en predecir cargas de trabajo y necesidades potenciales de personal.</option>
                    <option value='c'>c) Ha funcionado como un Director de Rama dentro la organización actual.</option>
                    <option value='d'>d) Ser igualmente capacitado para asumir el papel de Comandante de Incidente.</option>
                </select>
            </div>

            {/* 20. ¿Quién es responsable de determinar las tácticas apropiadas para un incidente? */}
            <div className='col-12'>

                <label className="control-label pt-2">20. ¿Quién es responsable de determinar las tácticas apropiadas para un incidente?</label>
                <select
                    className="form-control myInput"
                    name='20_asignado_incidente'
                    type=''
                    onChange={setInfo}
                >
                    <option value='x' >---Seleccione---</option>
                    <option value='a'>a) El Oficial de Seguridad.</option>
                    <option value='b'>b) La Sección de Planificación.</option>
                    <option value='c'>c) La Sección de Operaciones.</option>
                    <option value='d'>d) El Comandante de Incidente Auxiliar.</option>
                </select>
            </div>

        </div>
    );
}

export default SCI100;