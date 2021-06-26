const calculoIMC = (altura, peso) => {
  if (altura && peso) {
    const alturaM = parseInt(altura) / 100;
    return Math.round((parseFloat(peso) / Math.pow(alturaM, 2)) * 100) / 100;
  }
};

export default calculoIMC;
