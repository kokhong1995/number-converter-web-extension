/**
 * Author: Kok Hong
 * Last modified: 19 Oct, 2020
 */

function Hexadecimal() {
    /**
     * shortcut for converting single hexadecimal to binary
     * @param {*} input 
     */
    this.hexadecimalToBinary = function(input) {
        // 0 -> 0000
        if (input == "0") {
            return "0000";
        }
        // 1 -> 0001
        else if (input == "1") {
            return "0001";
        }
        // 2 -> 0010
        else if (input == "2") {
            return "0010";
        }
        // 3 -> 0011
        else if (input == "3") {
            return "0011";
        }
        // 4 -> 0100
        else if (input == "4") {
            return "0100";
        }
        // 5 -> 0101
        else if (input == "5") {
            return "0101";
        }
        // 6 -> 0110
        else if (input == "6") {
            return "0110";
        }
        // 7 -> 0111
        else if (input == "7") {
            return "0111";
        }
        // 8 -> 1000
        else if (input == "8") {
            return "1000";
        }
        // 9 -> 1001
        else if (input == "9") {
            return "1001";
        }
        // a or A -> 1010
        else if (input.toUpperCase() == "A") {
            return "1010";
        }
        // b or B -> 1011
        else if (input.toUpperCase() == "B") {
            return "1011";
        }
        // c or C -> 1100
        else if (input.toUpperCase() == "C") {
            return "1100";
        }
        // d or D -> 1101
        else if (input.toUpperCase() == "D") {
            return "1101";
        }
        // e or E -> 1110
        else if (input.toUpperCase() == "E") {
            return "1110";
        }
        // f or F -> 1111
        else if (input.toUpperCase() == "F") {
            return "1111";
        }
        // unknown input, return it back
        else {
            return input;
        }
    };

    /**
     * convert hexadecimal to binary
     * @param {*} hexadecimal 
     */
    this.toBinary = function(hexadecimal) {
        // if possible, split it into 2 parts (before and after a dot)
		let input = hexadecimal.split('.');

        /**
		 * do conversion for part 1
		 * get the length of part 1 (before a dot)
		 **/
        let length = input[0].length;
        let part1 = '';
        
        // convert each character of hexadecimal to binary
        for (i = 0; i < length; i++) {
        	part1 += this.hexadecimalToBinary(input[0].charAt(i));
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
		
        // convert each character of hexadecimal to binary
		for (i = 0; i < length; i++) {
			part2 += this.hexadecimalToBinary(input[1].charAt(i));
		}
        
        // return the concatenation of part 1 and part 2
		return part1 + '.' + part2;
    };
}
