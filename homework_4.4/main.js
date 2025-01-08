let numOrStr = prompt('введите число или строку');
console.log(numOrStr);

switch (true) {
    case numOrStr === null:
        console.log('вы отменили');
        break;
    case numOrStr.trim() === '':
        console.log('Пустая строка');
        break;
    case isNaN(+numOrStr):
        console.log('число Ba_NaN');
        break;
    default:
        console.log('OK!');
        break;
}

