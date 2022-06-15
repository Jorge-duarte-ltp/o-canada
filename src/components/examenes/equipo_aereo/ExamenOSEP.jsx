import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { size, isEmpty } from "lodash";
import Data from "./Data";
import AleatoryArray from "../../../singles/AleatoryArray";
import Swal from "sweetalert2";
import { postExamenOSEP } from "../../../services/exams/ExamsService";

const ExamenOSEP = ({ setState, state }) => {
  const { curp } = state;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState([]);
  const initialValues = { examen: "eval_osep", respuestas: [] };

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
      examen: yup.string().default(() => "eval_osep"),
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
      object.calificacion = (suma * 100) / size(Data);

      await postExamenOSEP(object)
        .then(async ({ status, data: { title, message } }) => {
          if (status === 200) {
            Swal.fire({
              title: title,
              icon: "success",
              text: message,
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
            "Error al guardar los resultados de el examen",
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

  const handleNumberToChar = (value) =>
    String.fromCharCode("a".charCodeAt(0) + value);

  const loadFields = (data) => {
    for (let index = 0; index < data.length; index++) {
      initialValues.respuestas.push({ id: index + 1, value: "" });
    }
  };

  return (
    <div className="col-12 col-md-12 ml-0 pt-2">
      <Button variant="warning" onClick={handleShow}>
        Examen Operaciones Seguras de Equipo Aéreo
      </Button>
      <Modal show={show} animation={false} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Examen de Operaciones Seguras de Equipo Aéreo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            {current.map((question) => (
              <React.Fragment key={question.id}>
                <div className="col-12 col-md-12 d-flex">
                  <div className="col-6 col-md-6">
                    <img
                      src={question.image}
                      className="rounded mx-auto d-block img-fluid"
                      alt={`Imagen asignada para la pregunta ${question.id}`}
                      width={`${question.width}`}
                      height={`${question.height}`}
                    />
                  </div>
                  <div className="col-6 col-md-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="d-block form-label text-justify"
                    >
                      {question?.id}.- {question?.nombre}
                    </label>
                    <select
                      className="form-control"
                      name={`respuestas[${question.id - 1}].value`}
                      value={formik.values.respuestas[question.id - 1].value}
                      onChange={formik.handleChange}
                      required
                    >
                      <option value="">---seleccione---</option>
                      {question.answers.map((item, index) => (
                        <option key={index} value={item.value}>
                          {handleNumberToChar(index)}) {item.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </React.Fragment>
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

export default ExamenOSEP;
