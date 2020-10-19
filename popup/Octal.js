/**
 * Author: Kok Hong
 * Last modified: 19 Oct, 2020
 */

function Octal() {
    /**
     * shortcut for converting single octal to binary
     * @param {*} character 
     */
    this.octalToBinary = function(character) {
        // 0 -> 000
        if (character == '0') {
            return '000';
        }
        // 1 -> 001
        else if (character == '1') {
            return '001';
        }
        // 2 -> 010
        else if (character == '2') {
            return '010';
        }
        // 3 -> 011
        else if (character == '3') {
            return '011';
        }
        // 4 -> 100
        else if (character == '4') {
            return '100';
        }
        // 5 -> 101
        else if (character == '5') {
            return '101';
        }
        // 6 -> 110
        else if (character == '6') {
            return '110';
        }
        // 7 -> 111
        else if (character == '7') {
            return '111';
        }
        // unknown error, return it back
        else {
            return character;
        }
    };

    /**
     * convert octal to binary
     * @param {*} octal 
     */
    this.toBinary = function(octal) {
        // if possible, split it into 2 parts (before and after a dot)
		let input = octal.split('.');

        /**
		 * do conversion for part 1
		 * get the length of part 1 (before a dot)
		 **/
        let length = input[0].length;
        let part1 = '';
        
        // convert each character of octal to binary
        for (i = 0; i < length; i++) {
        	part1 += this.octalToBinary(input[0].charAt(i));
        }

        /**
         * if part 2 does not exist, return part 1 only
         * else, the code for getting part 2 will be executed after this
         */
		if (input.length == 1 || input[1] == '')
			return part1;
        
        /**
		 * do conversion for part 2
		 * get the length of part 2 (after a dot)
		 **/
		length = input[1].length;
		let part2 = '';
		
        // convert each character of octal to binary
		for (i = 0; i < length; i++) {
			part2 += this.octalToBinary(input[1].charAt(i));
		}
        
        // return the concatenation of part 1 and part 2
		return part1 + '.' + part2;
    };
}
