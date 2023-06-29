import React from 'react'
// import SelectSiNo from '../../singles/SelectSiNo'

const S190 = (props) => {
  const { state, setState } = props

  const setInfo = (input) => {
    /* setea al state las variables */
    setState({
      ...state,
      [input.target.name]: input.target.value
    })
  }
  return (
    <div className='row'>
      {/* 1.	Es una definición de zona de seguridad */}
      <div className='col-12'>

        <label className="control-label pt-2">1.	Es una definición de zona de seguridad :</label>
        <select
          className="form-control myInput"
          name='1_partes_incendio'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Un lugar donde las y los combatientes pueden encontrar todo lo necesario.</option>
          <option value='b'>b) Un lugar donde las y los combatientes pueden estar siempre</option>
          <option value='c'>c) Un lugar donde las y los combatientes pueden encontrar refugio del peligro</option>
          <option value='d'>d) Un lugar que no existe en los incendios</option>
        </select>
      </div>

      {/*  2.	¿Por qué deben de mantener el personal combatiente por lo menos 2 metros o más de separación al caminar o trabajar juntos en la línea? */}
      <div className='col-12'>
        <label className="control-label pt-2"> 2.	¿Por qué deben de mantener el personal combatiente por lo menos 2 metros o más de separación al caminar o trabajar juntos en la línea? </label>
        <select
          className="form-control myInput"
          name='2_triangulo_fuego'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Porque así se abarca más espacio.</option>
          <option value='b'>b) Porque se llega más rápido si no hay obstáculos.</option>
          <option value='c'>c) Para evitar lastimar a nuestros compañeros con la herramienta.</option>
          <option value='d'>d) Porque en el bosque hay mucho espacio y no hay necesidad de andar muy juntos.</option>
        </select>
      </div>

      {/* 3.	Al abordar un helicóptero usted debe: */}
      <div className='col-12'>

        <label className="control-label pt-2">3.	Al abordar un helicóptero usted debe:</label>
        <select
          className="form-control myInput"
          name='3_comportamiento_fuego'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Acercarse cuando el piloto o el miembro de la brigada helitransportada se lo indique.</option>
          <option value='b'>b) Acercarse desde la cola del helicóptero.</option>
          <option value='c'>c) Puede abordar sin ser guiado.</option>
          <option value='d'>d) Todas las respuestas aplican.</option>
        </select>
      </div>

      {/* 4.	La técnica en terreno más eficiente para patrullar por focos secundarios es el uso sistemático cuadricular de revisar un área designada. */}
      <div className='col-12'>
        <label className="control-label pt-2">4.	La técnica en terreno más eficiente para patrullar por focos secundarios es el uso sistemático cuadricular de revisar un área designada.</label>
        <select
          className="form-control myInput"
          name='4_terreno_desconocido'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Verdadero</option>
          <option value='b'>b) Falso</option>
        </select>
      </div>

      {/* 5.	Seleccione la “Norma de Combate” en que se hace referencia a considerar el Comportamiento de Fuego: */}
      <div className='col-12'>

        <label className="control-label pt-2">5.	Seleccione la “Norma de Combate” en que se hace referencia a considerar el Comportamiento de Fuego:</label>
        <select
          className="form-control myInput"
          name='5_combate_incendios'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Norma Mantenga constante comunicación con su brigada, jefes o jefas y fuerzas adjuntas.</option>
          <option value='b'>b) Norma Combata el incendio agresivamente, habiendo provisto primero la seguridad.</option>
          <option value='c'>c) Norma Manténgase informado o informada sobre las condiciones del tiempo atmosférico y sus pronósticos.</option>
          <option value='d'>d) Norma Disponga de vigilantes cuando existe la posibilidad de peligro.</option>
        </select>
      </div>

      {/* 6.	¿Cuáles son tres factores del tiempo atmosférico son los más importantes para el personal combatiente?  */}
      <div className='col-12'>

        <label className="control-label pt-2">6.	¿Cuáles son tres factores del tiempo atmosférico más importantes para el personal combatiente? </label>
        <select
          className="form-control myInput"
          name='6_significa_vcrz'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Los combustibles, pendiente y topografía.</option>
          <option value='b'>b) Altitud sobre el nivel del mar, exposición y tipo de suelo.</option>
          <option value='c'>c) Temperatura, humedad relativa y viento.</option>
          <option value='d'>d) Estación del año, latitud y longitud.</option>
        </select>
      </div>

      {/*       7.	Difícil acceso y una vía angosta y congestionada, casas ubicadas en zonas de chimenea, cañones angostos, puertos o sobre pendientes inclinadas, límite de carga en los puentes, combustibles naturales cercanos a 10 metros de casas y evacuación del público; son ejemplos de… 
 */}
      <div className='col-12'>
  
        <label className="control-label pt-2">7.	Difícil acceso y una vía angosta y congestionada, casas ubicadas en zonas de chimenea, cañones angostos, puertos o sobre pendientes inclinadas, límite de carga en los puentes, combustibles naturales cercanos a 10 metros de casas y evacuación del público; son ejemplos de… </label>
        <select
          className="form-control myInput"
          name='7_carga_combustible'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Cosas que existen en las ciudades.</option>
          <option value='b'>b) Normas de seguridad en incendios forestales.</option>
          <option value='c'>c) Condiciones de alerta en zonas de interfase urbana/forestal.</option>
          <option value='d'>d) Situaciones que hay que observar para los helicópteros.</option>
        </select>
      </div>

      {/* 8.	Seleccione la “Norma de Combate” en que se hace referencia a considerar la Organización y Control de la brigada: */}
      <div className='col-12'>

        <label className="control-label pt-2">8.	Seleccione la “Norma de Combate” en que se hace referencia a considerar la Organización y Control de la brigada:</label>
        <select
          className="form-control myInput"
          name='8_linea_control'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Norma Mantenga constante comunicación con su brigada, jefes o jefas y fuerzas adjuntas.</option>
          <option value='b'>b) Norma Combata el incendio agresivamente, habiendo provisto primero la seguridad.</option>
          <option value='c'>c) Norma Manténgase informado o informada sobre las condiciones del tiempo atmosférico y sus pronósticos.</option>
          <option value='d'>d) Norma Disponga de vigilantes cuando existe la posibilidad de peligro.</option>
        </select>
      </div>

      {/* 9. Movimiento del incendio, expresado en longitud por unidad de tiempo */}
      <div className='col-12'>

        <label className="control-label pt-2">9.	La parte del incendio que está quemando de manera más intensa y con mayor propagación es generalmente llamada:</label>
        <select
          className="form-control myInput"
          name='9_movimiento_incendio'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Cabeza.</option>
          <option value='b'>b) Flanco.</option>
          <option value='c'>c) Dedo.</option>
          <option value='d'>d) cola.</option>
        </select>
      </div>

      {/* 10.	¿Cuáles son los tres métodos de transferencia de calor? */}
      <div className='col-12'>
    
        <label className="control-label pt-2">10.	¿Cuáles son los tres métodos de transferencia de calor?</label>
        <select
          className="form-control myInput"
          name='10_conduce_incendio'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Pavesas, Tiempo Atmosférico, Calor.</option>
          <option value='b'>b) Combustibles, Organización y Seguridad.</option>
          <option value='c'>c) Radiación, Convección y Conducción.</option>
        </select>
      </div>

      {/* 11.	¿Cuáles son los tres elementos del triángulo de fuego? */}
      <div className='col-12'>
  
        <label className="control-label pt-2">11.	¿Cuáles son los tres elementos del triángulo de fuego?</label>
        <select
          className="form-control myInput"
          name='11_topografia_elemento'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Calor, Oxígeno y Combustibles.</option>
          <option value='b'>b) Combustibles, Tiempo Atmosférico y Seguridad.</option>
          <option value='c'>c) Radiación, Convección y Conducción</option>
        </select>
      </div>

      {/* 12.	¿Qué sucede cuando el oxígeno es eliminado del triángulo de fuego? */}
      <div className='col-12'>

        <label className="control-label pt-2">12.	¿Qué sucede cuando el oxígeno es eliminado del triángulo de fuego?</label>
        <select
          className="form-control myInput"
          name='12_elemento_variable'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) No pasa nada</option>
          <option value='b'>b) El fuego se extingue por sofocación</option>
          <option value='c'>c) El comportamiento del fuego se hace más intenso</option>
        </select>
      </div>

      {/*  13. Una exposición norte tendrá más actividad de fuego que una exposición sur. */}
      <div className='col-12'>
      
        <label className="control-label pt-2"> 13. Una exposición norte tendrá más actividad de fuego que una exposición sur.</label>
        <select
          className="form-control myInput"
          name='13_referente_combustible'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Verdadero.</option>
          <option value='b'>b) Falso.</option>
        </select>
      </div>

      {/* 14. El combustible vertical se puede apreciar normalmente como: */}
      <div className='col-12'>
      
        <label className="control-label pt-2">14. El combustible vertical se puede apreciar normalmente como:</label>
        <select
          className="form-control myInput"
          name='14_tipos_combustible'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) El combustible es todo material inflamable ubicado debajo de la superficie.</option>
          <option value='b'>b) El combustible es todo material inflamable ubicado en ó sobre el suelo.</option>
          <option value='c'>c) Los combustibles forman una escalera; desde el suelo del bosque hacia las copas de los árboles, tales como ramas extendidas cerca del suelo, arbustos, árboles jóvenes en el sotobosque, etc.</option>
          <option value='d'>d) El combustible es todo material vivo y muerto ubicado en las copas superiores.</option>
        </select>
      </div>

      {/* 15. Seleccione los tres indicadores que señalan que el comportamiento del fuego va en aumento: */}
      <div className='col-12'>

        <label className="control-label pt-2">15. Seleccione los tres indicadores que señalan que el comportamiento del fuego va en aumento:</label>
        <select
          className="form-control myInput"
          name='15_agua_combustible'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Combustibles, Antorchas y Oxígeno.</option>
          <option value='b'>b) Llamaradas, Coronamiento y Atmósfera inestable.</option>
          <option value='c'>c) Aumento en la velocidad de propagación, Focos secundarios y aumento de humedad relativa.</option>
        </select>
      </div>

      {/* 16.  ¿Qué factor influye en la propagación del fuego más que cualquier otro? */}
      <div className='col-12'>
  
        <label className="control-label pt-2">16.  ¿Qué factor influye en la propagación del fuego más que cualquier otro?</label>
        <select
          className="form-control myInput"
          name='16_denominadores_comunes'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) El Comportamiento del Fuego.</option>
          <option value='b'>b) El Viento.</option>
          <option value='c'>c) La Topografía.</option>
          <option value='d'>d) La Humedad Relativa.</option>
        </select>
      </div>

      {/* 17. Seleccione la “Norma de Combate” en que se hace referencia a considerar la Seguridad en la Línea de Fuego: */}
      <div className='col-12'>

        <label className="control-label pt-2">17. Seleccione la “Norma de Combate” en que se hace referencia a considerar la Seguridad en la Línea de Fuego:</label>
        <select
          className="form-control myInput"
          name='17_lugares_combatiente'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Norma Mantenga constante comunicación con su brigada, jefes o jefas y fuerzas adjuntas.</option>
          <option value='b'>b) Norma Base toda acción en el comportamiento actual y futuro del incendio.</option>
          <option value='c'>c) Norma Dar instrucciones claras y asegurarse que han sido entendidas.</option>
          <option value='d'>d) Norma Disponga de vigilantes cuando existe la posibilidad de peligro.</option>
        </select>
      </div>

      {/* 18. Seleccione la “Situación que Grita Cuidado” que se presenta cuando al llegar al incendio, la brigada inmediatamente entra al terreno y combate realizando ataque directo: */}
      <div className='col-12'>

        <label className="control-label pt-2">18. Seleccione la “Situación que Grita Cuidado” que se presenta cuando al llegar al incendio, la brigada inmediatamente entra al terreno y combate realizando ataque directo:</label>
        <select
          className="form-control myInput"
          name='18_nivel_minimo'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Frecuentes focos secundarios al otro lado de la línea de control..</option>
          <option value='b'>b) El incendio no ha sido explorado o evaluado.</option>
          <option value='c'>c) Existe combustible no quemado entre usted y el incendio.</option>
          <option value='d'>d) Manténgase alerta, en calma, piense claramente y actúe con decisión.</option>
        </select>
      </div>

      {/* 19. ¿Qué incluyen los peligros de tormentas respecto del comportamiento de un incendio forestal? */}
      <div className='col-12'>
      
        <label className="control-label pt-2">19. ¿Qué incluyen los peligros de tormentas respecto del comportamiento de un incendio forestal?</label>
        <select
          className="form-control myInput"
          name='19_accion_conocer'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Fuertes vientos.</option>
          <option value='b'>b) Relámpagos.</option>
          <option value='c'>c) Comportamiento de fuego irregular.</option>
          <option value='d'>d) Todas las opciones son correctas.</option>
        </select>
      </div>

      {/* 20.	¿En qué tipo de combustible, el contenido de humedad, es el más afectado por un cambio de humedad relativa? */}
      <div className='col-12'>
        <label className="control-label pt-2">20.	¿En qué tipo de combustible, el contenido de humedad, es el más afectado por un cambio de humedad relativa?</label>
        <select
          className="form-control myInput"
          name='20_cantidad_humedad'
          type=''
          onChange={setInfo}
        >
          <option value='x' >---Seleccione---</option>
          <option value='a'>a) Pasto.</option>
          <option value='b'>b) Arbusto.</option>
          <option value='c'>c) Residuos de Bosques.</option>
          <option value='c'>c) Desechos de Aprovechamiento.</option>
        </select>
      </div>

    </div>
  );
}

export default S190;