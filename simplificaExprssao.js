let expressao = "A+B'*A+B+A'*A"

expressao = expressao.replace(/A'/g, 0);
expressao = expressao.replace(/B'/g, 0);
expressao = expressao.replace(/A/g, 1);
expressao = expressao.replace(/B/g, 1);

// 1+0*1+1+0*1
let arrayExpressao = expressao.split('+');

// [1,0*1,1,0*1]
let arrayResultAnd = arrayExpressao.map((element) => {
    if (Number(element)) {
        return element;
    } else {
        let arrayElemento = element.split('*');
        const result = multiplicaElementos(arrayElemento);
        return result;
    }
})
let arrayResultadoOr = somarElementos(arrayResultAnd);
console.log(arrayResultadoOr )




function somarElementos(arraySoma) {
    // retorna a soma de todos os elementos de um array
    const result = arraySoma.reduce((acc, element) => {
        return Number(acc) + Number(element);
    });
    return result
}

function multiplicaElementos(arrayMult) {
    // retorna o produto da Multiplicação todos os elementos de um array
    const result = arrayMult.reduce((acc, element) => {
        return acc * element;
    }, 1);
    return result;
}