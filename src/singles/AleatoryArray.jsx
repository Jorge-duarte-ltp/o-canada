import { RandomInt } from './RandomInt';
import { size, isUndefined } from "lodash";

const AleatoryArray = (array) => {

    const count = [];
    const arrayTemp = [];
    const limite = (size(array) <= 20 ? size(array) : 20);

    for (let i = 0; i < limite; i++) {
        let random = 1;
        while (!isUndefined(count.find(item => item === random))) {
            random = RandomInt(1, size(array))
        }
        count.push(random);
        arrayTemp.push(array.find(item => item.id === random));
    }
    return arrayTemp;
}


export default AleatoryArray;

