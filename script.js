// define valriable to catch element's target
const btnNumber = document.querySelectorAll('.btn-number');
const btnOperation = document.querySelectorAll('.btn-operation');
const btnEqual = document.querySelector('.btn-equal');
const btnClear = document.querySelector('.btn-clear');
const btnDelete = document.querySelector('.btn-delete');
const screenOutput = document.querySelector('.screen-output');

// create handling event listener onclick number button
btnNumber.forEach(number => {
    number.addEventListener('click', () => {
        screenOutput.textContent += number.textContent;
    });
});

// create handling event listener onclick math operation button
btnOperation.forEach(operation => {
    operation.addEventListener('click', () => {
        screenOutput.textContent += operation.textContent;
    });
});

// activate math operation + - x / % by user input and display the count result on the screen
btnEqual.addEventListener('click', () => {
    const splitNumberInput = screenOutput.textContent.split(/\+|-|\x|\/|\%/).map(arrayNumber => parseFloat(arrayNumber));
    const matchOperationInput = screenOutput.textContent.match(/\+|-|\x|\/|\%/g);

    let calculationResult = splitNumberInput[0];

    for (let i = 0; i < matchOperationInput.length; i++) {
        const operationType = matchOperationInput[i];
        const arrayNumber = splitNumberInput[i + 1];

        if (operationType === '+') {
            if (screenOutput.textContent.includes('%')) {
                const calculatePercentage = calculationResult * (arrayNumber / 100);
                calculationResult = calculationResult + calculatePercentage;
            } else {
                calculationResult += arrayNumber;
            };
        } else if (operationType === '-') {
            if (screenOutput.textContent.includes('%')) {
                const calculatePercentage = calculationResult * (arrayNumber / 100);
                calculationResult = calculationResult - calculatePercentage;
            } else {
                calculationResult -= arrayNumber;
            };
        } else if (operationType === 'x') {
            if (screenOutput.textContent.includes('%')) {
                calculationResult = calculationResult * (arrayNumber / 100);
            } else {
                calculationResult *= arrayNumber;
            };
        } else if (operationType === '/') {
            if (screenOutput.textContent.includes('%')) {
                calculationResult = calculationResult / (arrayNumber / 100);
            } else {
                calculationResult /= arrayNumber;
            };
        };
    };

    if (isNaN(calculationResult)) {
        screenOutput.textContent = 'Expression error';
    } else if (calculationResult == Infinity) {
        screenOutput.textContent = 'Cannot be divided by 0';
    } else {
        screenOutput.textContent = calculationResult;

        // screenOutput.textContent = calculationResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
});

// clear all screen content when button clear onclick
btnClear.addEventListener('click', () => {
    screenOutput.textContent = '';
});

// delete one by one from the last content on the screen
btnDelete.addEventListener('click', () => {
    const lastValueOutput = screenOutput.textContent;
    for (let i = 0; i < lastValueOutput.length; i++) {
        screenOutput.textContent = lastValueOutput.slice(0, lastValueOutput.length - 1);
    };
});