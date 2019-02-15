
(function () {
    const display = document.getElementById('display');
    const subdisplay = document.getElementById('way');

    const antiEval = (str) => {

        let arr = str.split(' ');

        switch (arr[1]) {
            case '+':
                return Math.round((+arr[0] + +arr[2]) * 100) / 100;
                break;
            case '-':
                return Math.round((+arr[0] - +arr[2]) * 100) / 100;
                break;
            case '/':

                return Math.round((+arr[0] / +arr[2]) * 100) / 100;
                break;
            case '*':
                return Math.round((+arr[0] * +arr[2]) * 100) / 100;
                break;
        };
    };

    let plusMinusButton = true;

    const plusMinus = (str) => {
        let arr = str.split(' ');
        if (plusMinusButton && arr.length === 1) {
            arr[0] = '-' + arr[0];
            plusMinusButton = false;
            return arr.join(' ');
        } else if (!plusMinusButton && arr.length === 1) {
            arr[0] = arr[0].replace(/[-]/g, "");
            plusMinusButton = true;
            return arr.join(' ');
        };

        if (plusMinusButton && arr.length > 2) {
            arr[2] = '-' + arr[2];
            plusMinusButton = false;
            return arr.join(' ');
        } else if (!plusMinusButton && arr.length > 2) {
            arr[2] = arr[2].replace(/[-]/g, "");
            plusMinusButton = true;
            return arr.join(' ');
        };

    };

    let booleanSign = true;
    let count = 0;
    let str = '';

    const keyboard = document.getElementById('keyboard');

    keyboard.addEventListener('click', (e) => {
        let target = e.target;

        if (target.value.match(/[0123456789\.]/)) {
            if (booleanSign === true) {
                display.textContent = '';
                booleanSign = false;
            };
            display.textContent += target.value;
            str += target.value;
        };

        if (target.value.match(/[^0123456789\.=c%m]/)) {
            count += 1;
            if (count === 2) {
                display.textContent = antiEval(str);
                str = antiEval(str);
                count = 1;
            };
            plusMinusButton = true;
            str += ' ' + target.value + ' ';
            booleanSign = true;
        };

        if (target.value.match('c')) {
            count = 0;
            booleanSign = true;
            str = ''
            display.textContent = '0';
        };

        if (target.value.match('%')) {
            count = 0;
            str = antiEval(str) / 100;
            display.textContent = str;
            booleanSign = false;
        };

        if (target.value.match('=')) {
            count = 0;
            display.textContent = antiEval(str);
            str = antiEval(str);
            booleanSign = false;
        };

        if (target.value.match('m')) {
            str = plusMinus(str);
            let arr = str.split(' ');
            if (arr.length > 2) {
                display.textContent = arr[2];
            } else {
                display.textContent = str
            };
        };
        subdisplay.innerHTML = str;
    });
})();
