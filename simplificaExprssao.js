const input = "((A*B)+(A*B))'";

console.log(input)

console.log("---------------------")
console.log("| A | B | C | D | X |")
console.log("---------------------")

for (let index = 0; index < 2; index++) {
    //var expressao = "A+B'*A+B+A'*A"
    var expressaoA = input;
    expressaoA = expressaoA.replace(/A'/g, Number(!index));
    expressaoA = expressaoA.replace(/A/g, Number(index));
    var respostaA = "| " + index + " | ";
    for (let index = 0; index < 2; index++) {
        var expressaoB = expressaoA;
        var respostaB = respostaA;
        respostaB += index + " | ";
        expressaoB = expressaoB.replace(/B'/g, Number(!index));
        expressaoB = expressaoB.replace(/B/g, Number(index));

        for (let index = 0; index < 2; index++) {
            var expressaoC = expressaoB;
            var respostaC = respostaB;
            respostaC += index + " | ";
            expressaoC = expressaoC.replace(/C'/g, Number(!index));
            expressaoC = expressaoC.replace(/C/g, Number(index));

            for (let index = 0; index < 2; index++) {
                var expressaoD = expressaoC;
                var respostaD = respostaC;
                respostaD += index + " | ";
                expressaoD = expressaoD.replace(/D'/g, Number(!index));
                expressaoD = expressaoD.replace(/D/g, Number(index));

                expressaoD = resolveParenteses(expressaoD);
                let arrayResultExpressao = resolveExpressao(expressaoD);
                console.log(respostaD + arrayResultExpressao + " |");
            }
        }
    }

}
console.log("---------------------")






function resolveExpressao(expressao) {
    // 1+0*1+1+0*1
    arrayExpressao = expressao.split('+');
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
    let resultado = Boolean(arrayResultadoOr)
    return Number(resultado);
}

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
function resolveParenteses(expressaoString) {
    expressaoString = expressaoString.replace(/0'/g, 1);
    expressaoString = expressaoString.replace(/1'/g, 0);
    let direcao;
    let arrayExpressao = expressaoString.split('');

    // ()()' (())'
    const indexApostrofo = arrayExpressao.findIndex((element) => element == "'");
    if (indexApostrofo != -1) {
        let arrayCortado = arrayExpressao.slice(0, indexApostrofo);
        arrayCortado.reverse();
        let contador = 0;
        const indexDeCorte = arrayCortado.findIndex((element) => {
            if (element == ')') {
                contador++
                return false;
            }
            if (element == '(') {
                contador--
                if (contador == 0) {
                    return true
                }
                return false;
            } else {
                return false;
            }
        })
        arrayCortado = arrayCortado.slice(1, indexDeCorte);
        arrayCortado.reverse();
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveParenteses(stringExpressao);
        expressaoString = expressaoString.replace(/0/g, "0'");
        expressaoString = expressaoString.replace(/1/g, "1'");
        arrayExpressao.splice(expressaoString.length - indexDeCorte - 2, (indexApostrofo + 1), resultExpressaoInterna);
    }

    const indexParenteses = arrayExpressao.findIndex((element) => {
        if (element == '(') {
            direcao = 'direita'
            return true
        } else if (element == ')') {
            direcao = 'esquerda'
            return true;
        } else {
            return false;
        }
    })
    if (direcao == 'direita') {
        const arrayCortado = arrayExpressao.slice(indexParenteses + 1);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveParenteses(stringExpressao);
        arrayExpressao.splice(indexParenteses, arrayExpressao.length, resultExpressaoInterna);
        stringExpressao = arrayExpressao.join('');
        return stringExpressao;

    } else if (direcao == 'esquerda') {
        let arrayCortado = arrayExpressao.slice(0, indexParenteses);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveExpressao(stringExpressao);
        arrayExpressao.splice(0, (indexParenteses + 1), resultExpressaoInterna);
        stringExpressao = arrayExpressao.join('');
        stringExpressao = resolveParenteses(stringExpressao);
        return stringExpressao;

    } else {
        return expressaoString
    }
}