import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { size, isEmpty } from "lodash";
import Data from "./Data";
import AleatoryArray from "../../../singles/AleatoryArray";
import Swal from "sweetalert2";
import { postExamen } from "../../../services/exams/ExamsService";
import Question from "../../../singles/Question";
import moment from "moment";
import { formatDate } from "../../../helpers/formatDate";
import useExitPrompt from "../../../hooks/useExitPrompt";

const ExamenSCI100 = ({ state, setState, hidden, setIsCompleteExam }) => {
  const { curp } = state;
  const [preguntas, setPreguntas] = useState(AleatoryArray(Data));
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState([]);
  const initialValues = { examen: "smi100", respuestas: [] };
  const [timeLeft, setTimeLeft] = useState(900);
  const [showOnBeforeUnload, setShowOnBeforeUnload] = useExitPrompt({
    showExitPrompt: false,
    accion: null,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {

      loadFields(preguntas);

      const temp = preguntas.map((item) => ({
        ...item,
        answers: AleatoryArray(item.answers),
      }));

      setCurrent([temp.pop()]);

      setCount(1);

      setData(temp);

      setTimeLeft(900);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      setShowOnBeforeUnload({ showOnBeforeUnload: false, accion: null });
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    if (show) {
    
      if (!timeLeft) {
    
        guardar();
    
      }

      setShowOnBeforeUnload({ ...showOnBeforeUnload, accion: guardar });

      const interval = setInterval(() => {
        
        setTimeLeft(timeLeft - 1);
      
      }, 1000);

      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [timeLeft, show]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      examen: yup.string().default(() => "smi100"),
      respuestas: yup.array().of(
        yup.object().shape({
          id: yup
            .number("el id debe ser entero")
            .required("El id de la pregunta es requerido"),
          value: yup.string().default(() => ""),
        })
      ),
    }),
    onSubmit: async ({ examen, respuestas }) => {
      let suma = 0;

      const object = { curp, examen, resultado: [] };

      respuestas.forEach((respuesta, index) => {
        const temp = preguntas.find(item => item.id === respuesta.id).answers;
        const answer = temp.find((item) => item.value === respuesta.value);
        suma = suma + (answer.correcta ? 1 : 0);
        object.resultado.push({ [`pregunta_${respuesta.id}`]: respuesta.value });
      });

      object.resultado = JSON.stringify(object.resultado);
      object.aciertos = suma;
      object.calificacion = Math.round((suma * 100) / size(preguntas));

      await postExamen(object)
        .then(async ({ status, data: { title, message } }) => {
          if (status === 200) {
            Swal.fire({
              title: title,
              icon: "success",
              html: `${message} <br> Aciertos: ${object.aciertos}/${size(
                Data
              )} <br> Calificación: ${object.calificacion}`,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                if (object.calificacion < 70) {
                  setState({
                    ...state,
                    rechazo: true,
                    motivo_rechazo: "no aprobo examen smi_100",
                    examen_smi_100: "reprobado",
                    fechaCreacion: formatDate(
                      new Date().toString().toUpperCase(),
                      0
                    ),
                  });
                } else {
                  setState({
                    ...state,
                    examen_smi_100: "aprobado",
                  });
                }
                handleClose();
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire(
            "Error",
            `Error al guardar los resultados de el examen: ${object.examen.toUpperCase()}`,
            "error"
          );
        });
    },
  });

  const guardar = () => {
    const { examen, respuestas } = formik.values;

    let suma = 0;

    const object = { curp, examen, resultado: [] };

    respuestas.forEach((respuesta) => {
      const temp = preguntas.find(item => item.id === respuesta.id).answers;
      const answer = temp.find((item) => item.value === respuesta.value);
      suma = suma + (answer.correcta ? 1 : 0);
      object.resultado.push({ [`pregunta_${respuesta.id}`]: respuesta.value });
    });

    object.resultado = JSON.stringify(object.resultado);
    object.aciertos = suma;
    object.calificacion = Math.round((suma * 100) / size(preguntas));

    postExamen(object)
      .then(async ({ status, data: { title, message } }) => {
        if (status === 200) {
          Swal.fire({
            title: title,
            icon: "success",
            html: `${message} <br> Aciertos: ${object.aciertos}/${size(
              Data
            )} <br> Calificación: ${object.calificacion}`,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              if (object.calificacion < 70) {
                setState({
                  ...state,
                  rechazo: true,
                  motivo_rechazo: "no aprobo examen smi_100",
                  examen_smi_100: "reprobado",
                  fechaCreacion: formatDate(
                    new Date().toString().toUpperCase(),
                    0
                  ),
                });
              } else {
                setState({
                  ...state,
                  examen_smi_100: "aprobado",
                });
              }
              handleClose();
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          html: `Error al guardar los resultados de el examen: ${object.examen.toUpperCase()}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleClose = () => {
    setIsCompleteExam((isCompleteExam) => !isCompleteExam);
    setShow((show) => !show);
    setShowOnBeforeUnload({
      ...showOnBeforeUnload,
      showExitPrompt: !showOnBeforeUnload.showExitPrompt,
    });
  };

  const handleShow = () => {
    Swal.fire({
      title: "Esta por iniciar una prueba",
      text:
        "Asegurese de tener una conexion estable de internet.\n" +
        "EL EXAMEN NO PODRA VOLVERSE A PRESENTAR SI SE SALE O REFRESCA LA PAGINA.\n" +
        "Cuenta con 15 minutos para responderla.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Iniciar Examen",
      reverseButtons: true,
      cancelButtonColor: "#801500",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShow((show) => !show);
      }
    });

    setShowOnBeforeUnload({
      ...showOnBeforeUnload,
      showExitPrompt: !showOnBeforeUnload.showExitPrompt,
    });
  };

  const handleNext = () => {
    if (isEmpty(formik.values.respuestas[indexOf(current[0].id)].value)) {
      Swal.fire("Campo requerido", "debes seleccionar una respuesta", "error");
    } else {
      setCurrent([data.pop()]);
      setCount((count) => count + 1);
    }
  };

  const loadFields = (data) => {
    for (let index = 0; index < data.length; index++) {
      initialValues.respuestas.push({ id: index + 1, value: "" });
    }
  };

  const indexOf = (id) => {
    return formik.values.respuestas.findIndex(item => item.id === id);
  }

  return (
    <div className="col-12 col-md-12 ml-0 pt-2">
      <Button variant="warning" onClick={handleShow} hidden={hidden}>
        Tomar Examen SCI/SMI 100-200
      </Button>
      <Modal
        show={show}
        animation={false}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="col-12 col-mb-12">
            Examen SCI/SMI 100-200
            <label className="float-sm-right">
              {moment
                .utc(moment.duration(timeLeft, "seconds").asMilliseconds())
                .format("m:ss")}
            </label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            {current.map((question) => (
              <Question
                key={question.id}
                question={question}
                name={`respuestas[${indexOf(question.id)}].value`}
                value={formik.values.respuestas[indexOf(question.id)].value}
                onChange={formik.handleChange}
              />
            ))}
            <div className="col-12 col-mb-12">
              <label className="float-sm-left">
                Pregunta {count}/{size(preguntas)}
              </label>
              {count === size(preguntas) ? (
                <Button
                  variant="outline-secondary float-sm-right border-0"
                  type="submit"
                >
                  Terminar
                </Button>
              ) : (
                <Button
                  variant="outline-secondary float-sm-right border-0"
                  onClick={handleNext}
                  type="button"
                >
                  Continuar
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExamenSCI100;
