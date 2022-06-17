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

const ExamenS190 = ({ state, setState }) => {
  const { curp } = state;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState([]);
  const initialValues = { examen: "s_190", respuestas: [] };

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
      examen: yup.string().default(() => "s_190"),
      preguntas: yup.array().of(
        yup.object().shape({
          id: yup
            .number("Debes de marcar el permiso")
            .min(1, "El permiso deber ser diferente de 0")
            .max(9, "El permiso a seleccionar debe ser menor a 9.")
            .required("Debes de marcar el permiso"),
          value: yup.bool().default(() => false),
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
              text: `${message} \n Aciertos: ${object.aciertos}/${size(Data)} \n Calificación: ${object.calificacion}`,
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
      <Button variant="warning" onClick={handleShow}>
        Tomar Examen S-130/S-190
      </Button>
      <Modal show={show} animation={false} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Examen S-130/S-190
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            {current.map((question) => (
              <Question key={question.id}
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
