import React from 'react'
import Image1 from '../../assets/images/examen_prueba/image1.png';
import Image2 from '../../assets/images/examen_prueba/image2.png';
import Image3 from '../../assets/images/examen_prueba/image3.png';
import Image4 from '../../assets/images/examen_prueba/image4.png';
import Image5 from '../../assets/images/examen_prueba/image5.png';
import Image6 from '../../assets/images/examen_prueba/image6.png';
import Image7 from '../../assets/images/examen_prueba/image7.jpg';
import Image8 from '../../assets/images/examen_prueba/image8.png';

const ExamenPrueba = () => {
    return (
        <div className='row d-flex'>
            <div className="col-12 col-md-6 d-flex pb-5 mr-0">
                <div className='col-5 col-md-3'>
                    <img src={Image1} className="rounded mx-auto d-block img-fluid" alt='image1' width='128px' height='128px' />
                </div>
                <div className="col-8 col-md-8">
                    <label for="exampleFormControlInput1" className="d-block form-label text-justify">1.- ¿Qué nombre reciben los tres elementos que deben estar presentes y combinados antes que ocurra y continué la combustión?</label>
                    <select className="rounded form-select" aria-label="Default select example">
                        <option selected>-- seleciona --</option>
                        <option value="a">A) La gran triada</option>
                        <option value="b">B) Triangulo del Fuego</option>
                        <option value="c">C) Compuestos de un incendio</option>
                        <option value="d">D) Todas las anteriores</option>
                    </select>
                </div>
            </div>
            <div className="col-12 col-md-6 d-flex pb-5">
                <div className='col-5 col-md-4'>
                    <img src={Image2} className="rounded mx-auto d-block img-fluid" alt='image2' width='192px' height='128px' />
                </div>
                <div className="col-8 col-md-8">
                    <label for="exampleFormControlInput1" className="d-block form-label text-justify">2.- En el hemisferio norte corresponde a una elevación natural del terreno que presenta dos laderas, una con exposición norte y la otra con exposición sur, indique:</label>
                    <div className='d-flex'>
                        <label for="exampleFormControlInput1" className="d-block form-label pr-1">¿Qué ladera presentará mayor humedad relativa?</label>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option1" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                A
                            </label>
                        </div>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option1" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                B
                            </label>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <label for="exampleFormControlInput1" className="d-block form-label pr-1">¿Qué ladera sería menos calurosa? </label>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option2" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                A
                            </label>
                        </div>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option2" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                B
                            </label>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <label for="exampleFormControlInput1" className="d-block form-label text-justify pr-1">¿Qué ladera tendría mayor actividad de fuego?</label>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option3" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                A
                            </label>
                        </div>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option3" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                B
                            </label>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <label for="exampleFormControlInput1" className="d-block form-label pr-1 text-justify">¿Qué ladera presentará una menor velocidad de propagación del fuego?</label>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option4" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                A
                            </label>
                        </div>
                        <div className="form-check pr-1">
                            <input className="form-check-input" type="radio" name="option4" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                                B
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 d-flex pb-5 mr-0">
                <div className='col-5 col-md-3'>
                    <img src={Image1} className="rounded mx-auto d-block img-fluid" alt='image3' width='128px' height='128px' />
                </div>
                <div className="col-8 col-md-8">
                    <label for="exampleFormControlInput1" className="d-block form-label text-justify">1.- ¿Qué nombre reciben los tres elementos que deben estar presentes y combinados antes que ocurra y continué la combustión?</label>
                    <select className="rounded form-select" aria-label="Default select example">
                        <option selected>-- seleciona --</option>
                        <option value="a">A) La gran triada</option>
                        <option value="b">B) Triangulo del Fuego</option>
                        <option value="c">C) Compuestos de un incendio</option>
                        <option value="d">D) Todas las anteriores</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ExamenPrueba