"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync('file/countries.txt', 'utf8');
const splitDataLine = data.split('\n');
const countryName = [];
splitDataLine.forEach((e) => {
    countryName.push(e.split(' '));
});
const resultArray = [];
const countriesReverse = [];
for (let j = 0; j < countryName.length; j++) {
    countriesReverse.push(countryName[j].reverse());
    if (!isNaN(parseInt(countriesReverse[j][1])) &&
        parseInt(countriesReverse[j][1]) !== 0 &&
        parseInt(countriesReverse[j][1]) !== 1 &&
        isNaN(parseInt(countriesReverse[j][2]))) {
        const densityCalc = Number(countriesReverse[j][1].replace(/,/g, '')) /
            Number(countriesReverse[j][0].replace(/,/g, ''));
        const country = {
            countryName: countriesReverse[j]
                .splice(2, countriesReverse[j].length - 1)
                .reverse()
                .join(' '),
            population: countriesReverse[j][1].replace(/,/g, '.'),
            area: countriesReverse[j][0].replace(/,/g, '.'),
            density: Math.round(densityCalc),
        };
        resultArray.push(country);
    }
}
const formattedData = resultArray.sort((a, b) => b.density - a.density);
fs_1.default.writeFileSync('countries.csv', `Country, Population, Area\n`, {
    encoding: 'utf8',
    flag: 'a+',
    mode: 0o666,
});
formattedData.map((e) => fs_1.default.writeFileSync('countries.csv', `${e.countryName}, ${e.population}, ${e.area}, ${e.density}\n`, {
    encoding: 'utf8',
    flag: 'a+',
    mode: 0o666,
}));
//# sourceMappingURL=index.js.map