import fs from 'fs'

const data = fs.readFileSync('file/countries.txt', 'utf8')
const splitDataLine = data.split('\n')
const countryName: string[][] = []

splitDataLine.forEach((e) => {
	countryName.push(e.split(' '))
})

type TResultArray = {
	countryName: string
	population: string
	area: string
	density: number
}

const resultArray: TResultArray[] = []
const countriesReverse: string[][] = []

for (let j = 0; j < countryName.length; j++) {
	countriesReverse.push(countryName[j].reverse())
	if (
		!isNaN(parseInt(countriesReverse[j][1])) &&
		parseInt(countriesReverse[j][1]) !== 0 &&
		parseInt(countriesReverse[j][1]) !== 1 &&
		isNaN(parseInt(countriesReverse[j][2]))
	) {
		const densityCalc =
			Number(countriesReverse[j][1].replace(/,/g, '')) /
			Number(countriesReverse[j][0].replace(/,/g, ''))
		const country = {
			countryName: countriesReverse[j]
				.splice(2, countriesReverse[j].length - 1)
				.reverse()
				.join(' '),
			population: countriesReverse[j][1].replace(/,/g, '.'),
			area: countriesReverse[j][0].replace(/,/g, '.'),
			density: Math.round(densityCalc),
		}
		resultArray.push(country)
	}
}

const sortedData: TResultArray[] = resultArray.sort(
	(a, b) => b.density - a.density
)

fs.writeFileSync('countries.csv', `Country, Population, Area\n`, {
	encoding: 'utf8',
	flag: 'a+',
	mode: 0o666,
})

sortedData.map((e: TResultArray) =>
	fs.writeFileSync(
		'countries.csv',
		`${e.countryName}, ${e.population}, ${e.area}, ${e.density}\n`,
		{
			encoding: 'utf8',
			flag: 'a+',
			mode: 0o666,
		}
	)
)
