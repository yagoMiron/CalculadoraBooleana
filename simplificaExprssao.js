let expressao = "A+B'*A+B+A'*A"

expressao = expressao.replace("A'", 0);
expressao = expressao.replace("B'", 0);
expressao = expressao.replace("A", 1);
expressao = expressao.replace("B", 1);

let arrayExpressao = expressao.split('');
console.log(arrayExpressao)