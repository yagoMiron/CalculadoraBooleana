let expressao = "A+B'*A+B+A'*A"

expressao = expressao.replace(/A'/g, 0);
console.log(expressao);
expressao = expressao.replace(/B'/g, 0);
console.log(expressao);
expressao = expressao.replace(/A/g, 1);
console.log(expressao);
expressao = expressao.replace(/B/g, 1);
console.log(expressao);

let arrayExpressao = expressao.split('+');

arrayExpressao = arrayExpressao.forEach(element => {
    let arrayElemento = element.split('+');
    if (Number(element)) {
        return element;
    } else {
    arrayElemento = arrayElemento.forEach(element => {
        let arrayElemento = element.split('*');
        if (Number(element)) {
            return element;
        } else {
        arrayElemento = multiplicaElementos(arrayElemento);
        return arrayElemento;
        }
    })
        arrayElemento = somarElementos(arrayElemento);
        return arrayElemento;
    }
});

console.log(arrayExpressao)

function somarElementos(arraySoma) {
    // retorna a soma de todos os elementos de um array
    const result = arraySoma.reduce((acc, element) => {
        return Number(acc) + Number(element);
    });
    return result
}

function multiplicaElementos(arrayMult) {
    // retorna o produto da Multiplicação todos os elementos de um array
    const result = arrayMult.reduce(function (acc, element) {
        return acc * element;
    }, 1);
    return result;
}