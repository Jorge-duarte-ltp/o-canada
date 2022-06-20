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
import useExitPrompt from "../../../hooks/useExitPrompt";
import { formatDate } from "../../../helpers/formatDate";
import moment from "moment";

const ExamenS190 = ({ state, setState, hidden, setIsCompleteExam }) => {
  const { curp } = state;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState([]);
  const initialValues = { examen: "s_190", respuestas: [] };
  const [timeLeft, setTimeLeft] = useState(900);
  const [showOnBeforeUnload, setShowOnBeforeUnload] = useExitPrompt({
    showExitPrompt: false,
    accion: null,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadFields(Data);

      const temp = AleatoryArray(
        Data.map((item) => ({
          ...item,
          answers: AleatoryArray(item.answers),
        }))
      );

      setCurrent([temp.pop()]);
      setTimeLeft(900);

      setData(temp);
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
      examen: yup.string().default(() => "s_190"),
      preguntas: yup.array().of(
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

      const object = { curp, examen };

      respuestas.forEach((respuesta, index) => {
        const temp = Data[index].answers;
        const answer = temp.find((item) => item.value === respuesta.value);
        suma = suma + (answer.correcta ? 1 : 0);
        object[`pregunta_${respuesta.id}`] = respuesta.value;
      });

      object.aciertos = suma;
      object.calificacion = Math.round((suma * 100) / size(Data));

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
                    motivo_rechazo: "no aprobo examen si_190",
                    examen_s_190: "reprobado",
                    fechaCreacion: formatDate(
                      new Date().toString().toUpperCase(),
                      0
                    ),
                  });
                } else {
                  setState({
                    ...state,
                    examen_s_190: "aprobado",
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

    const object = { curp, examen };

    respuestas.forEach((respuesta, index) => {
      const temp = Data[index].answers;
      const answer = temp.find((item) => item.value === respuesta.value);
      suma = suma + (answer?.correcta ? 1 : 0);
      object[`pregunta_${respuesta.id}`] = respuesta.value
        ? respuesta.value
        : null;
    });

    object.aciertos = suma;
    object.calificacion = Math.round((suma * 100) / size(Data));

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
                  motivo_rechazo: "no aprobo examen si_190",
                  examen_s_190: "reprobado",
                  fechaCreacion: formatDate(
                    new Date().toString().toUpperCase(),
                    0
                  ),
                });
              } else {
                setState({
                  ...state,
                  examen_s_190: "aprobado",
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
    if (isEmpty(formik.values.respuestas[current[0].id - 1].value)) {
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

  return (
    <div className="col-12 col-md-12 ml-0 pt-2">
      <Button variant="warning" onClick={handleShow} hidden={hidden}>
        Tomar Examen S-130/S-190
      </Button>
      <Modal
        show={show}
        animation={false}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="col-12 col-mb-12">
            Examen S-130/S-190
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
                name={`respuestas[${question.id - 1}].value`}
                value={formik.values.respuestas[question.id - 1].value}
                onChange={formik.handleChange}
              />
            ))}
            <div className="col-12 col-mb-12">
              <label className="float-sm-left">
                Pregunta {count}/{size(Data)}
              </label>
              {count === size(Data) ? (
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

export default ExamenS190;
