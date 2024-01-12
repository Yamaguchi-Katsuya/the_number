// 動的関数実行用に関数配列を用意
var numberFuncList = new Array();

// 素数判定
numberFuncList.prime = (number) => {
    if (number < 2) {
        return `${number}は素数ではありません。`;
    }
    for (var i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
        return `${number}は素数ではありません。`;
        }
    }
    return `${number}は素数です。`;
}

// 素因数分解
numberFuncList.primeFactorization = (number) => {
    const orgNumber = number;
    const factors = [];
    for (var i = 2; i <= number; i++) {
        while (number % i === 0) {
        factors.push(i);
        number /= i;
        }
    }
    const result = factors.join(' * ');
    return `${orgNumber} = ${result}`;
}

// 完全数判定
numberFuncList.perfectNumber = (number) => {
    var sum = 0;
    for (var i = 1; i < number; i++) {
        if (number % i === 0) {
            sum += i;
        }
    }

    console.log(number + typeof number)
    console.log(sum + typeof sum)

    return sum === number ? `${number}は完全数です。` : `${number}は完全数ではありません。`;
}

// 最大公約数
numberFuncList.gcd = (number1, number2) => {
    if (number2 === 0) {
        return `最大公約数は${number1}です。`;
    }
    return numberFuncList.gcd(number2, number1 % number2);
}
