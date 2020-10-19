/**
 * Author: Kok Hong
 * Last modified: 19 Oct, 2020
 */

// initilize required libraries!
var binary = new Binary();
var decimal = new Decimal();
var octal = new Octal();
var hexadecimal = new Hexadecimal();

/**
 * change the font color to red if invalid format
 * else, restore to initial color
 * @param {*} id 
 * @param {*} valid 
 */
function changeFontColor(id, valid) {
    if (valid)
        document.getElementById(id).style.color = 'initial';
    else
        document.getElementById(id).style.color = '#ff0000';
}

/**
 * return true if it was valid format
 * else, return false
 * @param {*} unit 
 * @param {*} input 
 */
function isValid(unit, input) {
    if (unit == 'bin') {
        return input.match(/^[0-1]+\.?[0-1]*$/gm) == null ? false : true;
    }
    else if (unit == 'oct') {
        return input.match(/^[0-7]+\.?[0-7]*$/gm) == null ? false : true;
    }
    else if (unit == 'dec') {
        return input.match(/^[0-9]+\.?[0-9]*$/gm) == null ? false : true;
    }
    else if (unit == 'hex') {
        return input.match(/^[0-9A-Fa-f]+\.?[0-9A-Fa-f]*$/gm) == null ? false : true;
    }
}

/**
 * used for trim binary
 * remove leading zero, and trailing zero (if contains a dot)
 * @param {*} binary 
 */
function trimBinary(binary) {
    binary = binary.replace(/^0+|\.0+$/gm, '').replace(/^\./gm, '0.');
    
    if (binary.includes('.'))
        return binary.replace(/0+$/gm, '');
    else if (binary == '' | binary == '0.')
        return '0';
    else
        return binary;
}

/**
 * remove all whitespaces and set default value
 * @param {*} input 
 */
function trimInput(input) {
    input = input
        .replace(/\s+/gm, '')
        .replace(/^\./gm, '0.');

    return input; 
}

/**
 * return the value of input
 * @param {*} id 
 */
function getInput(id) {
	return document.getElementById(id).value;
}

/**
 * clear all text area
 */
function resetValues() {
    document.getElementById('bin').value = '';
    document.getElementById('dec').value = '';
    document.getElementById('oct').value = '';
    document.getElementById('hex').value = '';
}

/**
 * convert the input to other units and display it!
 * @param {*} id 
 */
function convert(id) {
    // get the input by id and trim it
    let input = trimInput(getInput(id));

    // clear all text area and quit if the input was empty!
    if (input == '') {
        resetValues();
        return;
    }
    
    // if current input was binary
    if (id == 'bin') {
        // stop computing if invalid binary format!
        if (!isValid('bin', input)) {
            changeFontColor('bin', false); 
            return; 
        }
        else {
            changeFontColor('bin', true);
        }

        // trim binary
        input = trimBinary(input);
        
        // convert to decimal and display it
        document.getElementById('dec').value = binary.toDecimal(input);
        // convert to octal and display it
        document.getElementById('oct').value = binary.toOctal(input);
        // convert to hexadecimal and display it
        document.getElementById('hex').value = binary.toHexadecimal(input);
    }
    // if current input was decimal
    else if (id == 'dec') {
        // stop computing if invalid decimal format!
        if (!isValid('dec', input)) {
            changeFontColor('dec', false);
            return; 
        }
        else {
            changeFontColor('dec', true);
        }

        // convert to binary and trim it
        let strBinary = trimBinary(decimal.toBinary(input));
        // display binary
        document.getElementById('bin').value = strBinary;
        // convert to octal and display it
        document.getElementById('oct').value = binary.toOctal(strBinary);
        // convert to hexadecimal and display it
        document.getElementById('hex').value = binary.toHexadecimal(strBinary);
    }
    // if current input was octal
    else if (id == 'oct') {
        // stop computing if invalid octal format!
        if (!isValid('oct', input)) {
            changeFontColor('oct', false); 
            return; 
        }
        else {
            changeFontColor('oct', true);
        }

        // convert to binary
        let strBinary = octal.toBinary(input);
        // trim and display the binary
        document.getElementById('bin').value = trimBinary(strBinary);
        // convert to decimal, trim and display it
        document.getElementById('dec').value = binary.toDecimal(strBinary);
        // convert to hexadecimal, trim and display it
        document.getElementById('hex').value = trimBinary(binary.toHexadecimal(strBinary));
    }
    // if current input was hexadecimal
    else if (id == 'hex') {
        // stop computing if invalid hexadecimal format!
        if (!isValid('hex', input)) {
            changeFontColor('hex', false); 
            return; 
        }
        else {
            changeFontColor('hex', true);
        }

        // convert to binary and trim it
        let strBinary = hexadecimal.toBinary(input);
        // trim and display the binary
        document.getElementById('bin').value = trimBinary(strBinary);
        // convert to decimal and display it
        document.getElementById('dec').value = binary.toDecimal(strBinary);
        // convert to octal, trim and display it
        document.getElementById('oct').value = trimBinary(binary.toOctal(strBinary));
    }
}

/**
 * disable or enable all button copy based on the condition
 */
function adjustButtonCopy() {
    // adjust hex-copy
    let hexCopyDisabled = document.getElementById('hex').value == '' ? true : false;
    document.getElementById('hex-copy').disabled = hexCopyDisabled;
    // adjust dec-copy
    let decCopyDisabled = document.getElementById('dec').value == '' ? true : false;
    document.getElementById('dec-copy').disabled = decCopyDisabled;
    // adjust oct-copy
    let octCopyDisabled = document.getElementById('oct').value == '' ? true : false;
    document.getElementById('oct-copy').disabled = octCopyDisabled;
    // adjust bin-copy
    let binCopyDisabled = document.getElementById('bin').value == '' ? true : false;
    document.getElementById('bin-copy').disabled = binCopyDisabled;
}

/**
 * copy the selected value
 * @param {*} id 
 */
function copyValue(id) {
    let copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

// add event listener to the textarea
document.getElementById('hex').addEventListener("keyup", (e) => {
    convert('hex');
    adjustButtonCopy();
});
document.getElementById('dec').addEventListener("keyup", (e) => {
    convert('dec');
    adjustButtonCopy();
});
document.getElementById('oct').addEventListener("keyup", (e) => {
    convert('oct');
    adjustButtonCopy();
});
document.getElementById('bin').addEventListener("keyup", (e) => {
    convert('bin');
    adjustButtonCopy();
});

// add event listener to the button reset
document.getElementById('reset').addEventListener("click", (e) => {
    resetValues();
    adjustButtonCopy();
});

// add click listener to the button copy
document.getElementById('hex-copy').addEventListener("click", (e) => {
    copyValue('hex');
});
document.getElementById('dec-copy').addEventListener("click", (e) => {
    copyValue('dec');
});
document.getElementById('oct-copy').addEventListener("click", (e) => {
    copyValue('oct');
});
document.getElementById('bin-copy').addEventListener("click", (e) => {
    copyValue('bin');
});