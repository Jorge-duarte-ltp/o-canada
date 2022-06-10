export const RandomInt = (min, max) => {
    return Math.floor(1 + Math.random() * (max - min)) + min;
}
