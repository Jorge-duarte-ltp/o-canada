import { RandomInt } from "./RandomInt";
import { size } from "lodash";

const AleatoryArray = (array) => {
  const count = [];
  const arrayTemp = [];
  const limite = size(array) <= 20 ? size(array) : 20;

  for (let i = 0; i < limite; i++) {
      let random = 0;

      const isContained = (random) => count.some(item => item === random);

      while (isContained(random)) {
          random = RandomInt(0, size(array) - 1)
      }

      count.push(random);
      arrayTemp.push(array.find((item, index) => index === random));
  }

  return arrayTemp;
};

export default AleatoryArray;
