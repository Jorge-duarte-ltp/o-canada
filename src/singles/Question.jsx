import React from 'react'

const Question = ({ question, value, name, onChange }) => {

    const handleNumberToChar = (value) =>
        String.fromCharCode("a".charCodeAt(0) + value);

    return (
        <div className="col-12 col-md-12 d-flex">
            {question?.image && <div className="col-6 col-md-6">
                <img
                    src={question.image}
                    className="rounded mx-auto d-block img-fluid"
                    alt={`Imagen asignada para la pregunta ${question.id}`}
                    width={`${question.width}`}
                    height={`${question.height}`}
                />
            </div>
            }
            <div className="col-6 col-md-6">
                <label
                    htmlFor="exampleFormControlInput1"
                    className="d-block form-label text-justify"
                >
                    {question?.id}.- {question?.nombre}
                </label>
                <select
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
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
    )
}

export default Question