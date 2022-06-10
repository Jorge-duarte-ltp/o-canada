import { RandomInt } from './RandomInt';
import { size, isUndefined } from "lodash";

const AleatoryArray = (array) => {

    const count = [];
    const arrayTemp = [];
    for (let i = 0; i < size(array); i++) {
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

