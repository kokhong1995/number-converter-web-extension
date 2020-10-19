/**
 * Author: Kok Hong
 * Last modified: 19 Oct, 2020
 */

function Decimal() {
    /**
     * convert the first part of decimal to binary (before a dot)
     * @param {*} input 
     */    
	this.decimalToBinaryPart1 = function(input) {
        let output = '';
		let intOutput = parseInt(input);
        
        // get binary using division method
        while (intOutput != 0) {
            let remainder = intOutput % 2;
            output = remainder.toString() + output;
            
            intOutput = parseInt(intOutput / 2);
        }

        return output == '' ? '0' : output; // DEBUG
	};

    /**
     * convert the second part of decimal to binary (after a dot)
     * @param {*} input 
     */
    this.decimalToBinaryPart2 = function(input) {
        // make it become 0.xx
        let floatInput = parseFloat('0.' + input.toString());
        
        let strOutput = '';
        let length = input.length * 64; // DEBUG

        for (i = 0; i < length; i++) {
            // multiply 2
            floatInput *= 2;

            // minus 1 if floatInput is equal/larger to/than 1 
            if (floatInput >= 1) {
                strOutput += '1';
                floatInput -= 1;
            } 
            else {
                strOutput += '0';
            }
        }

        return strOutput;
    };

    /**
     * convert decimal to binary
     * @param {*} decimal 
     */
    this.toBinary = function(decimal) {
        // if possible, split it into 2 parts (before and after a dot)
		let input = decimal.split('.');

        /**
		 * do conversion for part 1 (before a dot)
		 **/
        let part1 = this.decimalToBinaryPart1(input[0]);
        
        /**
         * if part 2 does not exist, return part 1 only
         * else, the code for getting part 2 will be executed after this
         */
		if (input.length == 1 || input[1] == '')
			return part1;

        /**
		 * do conversion for part 2 (after a dot)
		 **/
		let part2 = this.decimalToBinaryPart2(input[1]);
		
        // return the concatenation of part 1 and part 2
		return part1 + '.' + part2;            
    };
}
