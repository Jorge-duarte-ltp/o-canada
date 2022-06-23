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

const ExamenOSEP = ({ setState, state }) => {
  const { curp } = state;
  const [preguntas,] = useState(AleatoryArray(Data));
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState([]);
  const initialValues = { examen: "eval_osep", respuestas: [] };

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

    }, 2000);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      examen: yup.string().default(() => "eval_osep"),
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
                preguntas
              )} <br> Calificación: ${object.calificacion}`,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                setState({ ...state, examen_equipo_aereo: "completa" });
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

  const handleClose = () => {
    setShow((show) => !show);
  };

  const handleShow = () => {
    setShow((show) => !show);
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
    data.forEach(item => {
      initialValues.respuestas.push({ id: item.id, value: "" });
    });
  };


  const indexOf = (id) => {
    return formik.values.respuestas.findIndex(item => item.id === id);
  }

  return (
    <div className="col-12 col-md-12 ml-0 pt-2">
      <Button variant="warning" onClick={handleShow}>
        Examen Operaciones Seguras de Equipo Aéreo
      </Button>
      <Modal
        show={show}
        animation={false}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>
            Examen de Operaciones Seguras de Equipo Aéreo
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

export default ExamenOSEP;
