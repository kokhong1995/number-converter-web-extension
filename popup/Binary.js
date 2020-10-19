/**
 * Author: Kok Hong
 * Last modified: 19 Oct, 2020
 */

function Binary() {
    // constant values
	this.LENGTH_OCTAL = 3;
	this.LENGTH_HEXADECIMAL = 4;
	this.LEFT = 'left';
	this.RIGHT = 'right';
    
    /**
     * convert binary to decimal
     * @param {*} binary 
     */
	this.toDecimal = function(binary) {
		// if possible, split it into 2 parts (before and after a dot) 
		let input = binary.split(".");
		
		/**
		 * do conversion for part 1
		 * get the length of part 1 (before a dot)
		 **/
        let length = input[0].length;
        
        let index = 0, total = 0;

        for (i = length - 1; i >= 0; i--) {
        	// e.g: 1 * 2^5 
            let formula = parseInt(input[0].charAt(i)) * (Math.pow(2, index));
            total += formula;
            
            index++;
        }

		// e.g: if input == '100' or '100.'
        if (input.length == 1 || input[1] == '')
            return total.toString();
		
		/**
		 * do conversion for part 2
		 * get the length of part 2 (after a dot)
		 **/
		length = input[1].length;

		// index starts with -1, -2 ...
		index = -1;
		let total2 = 0;
		
		for (i = 0; i < length; i++) {
			let formula = 1 / (Math.pow(2, Math.abs(index)));
			formula = parseInt(input[1].charAt(i)) * formula;
			total2 += formula;
			
			index--;
		}

		return total + total2;
	};
    
    /**
     * shorcut for converting single binary to decimal
     * @param {*} input 
     */
	this.binaryToHexadecimal = function(input) {
        // 0000 -> 0
        if (input == '0000') {
            return '0';
        }
        // 0001 -> 1
        else if (input == '0001') {
            return '1';
        }
        // 0010 -> 2
        else if (input == '0010') {
            return '2';
        }
        // 0011 -> 3
        else if (input == '0011') {
            return '3';
        }
        // 0100 -> 4
        else if (input == '0100') {
            return '4';
        }
        // 0101 -> 5
        else if (input == '0101') {
            return '5';
        }
        // 0110 -> 6
        else if (input == '0110') {
            return '6';
        }
        // 0111 -> 7
        else if (input == '0111') {
            return '7';
        }
        // 1000 -> 8
        else if (input == '1000') {
            return '8';
        }
        // 1001 -> 9
        else if (input == '1001') {
            return '9';
        }
        // 1010 -> A
        else if (input == '1010') {
            return 'A';
        }
        // 1011 -> B
        else if (input == '1011') {
            return 'B';
        }
        // 1100 -> C
        else if (input == '1100') {
            return 'C';
        }
        // 1101 -> D
        else if (input == '1101') {
            return 'D';
        }
        // 1110 -> E
        else if (input == '1110') {
            return 'E';
        }
        // 1111 -> F
        else if (input == '1111') {
            return 'F';
        }
        // unknown error, return it back
        else {
            return input;
        }
    };
    
    /**
     * shorcut for converting single binary to octal
     * @param {*} input 
     */
    this.binaryToOctal = function(input) {
        // 000 -> 0
        if (input == "000") {
            return "0";
        }
        // 001 -> 1
        else if (input == "001") {
            return "1";
        }
        // 010 -> 2
        else if (input == "010") {
            return "2";
        }
        // 011 -> 3
        else if (input == "011") {
            return "3";
        }
        // 100 -> 4
        else if (input == "100") {
            return "4";
        }
        // 101 -> 5
        else if (input == "101") {
            return "5";
        }
        // 110 -> 6
        else if (input == "110") {
            return "6";
        }
        // 111 -> 7
        else if (input == "111") {
            return "7";
        }
        // unknown error, return it back
        else {
            return input;
        }
    };
    
    /**
     * split the input into multile specific length of parts
     * direction indicates the position of leading zero
     * @param {*} input 
     * @param {*} length 
     * @param {*} direction 
     */
    this.splitByLength = function(input, length, direction) {
    	// completing the binary with leading zero
    	let incompleteBinary = input.length % length; 
    	if (incompleteBinary != 0) {
    		let leadingZero = length - incompleteBinary;
    		for (i = 0; i < leadingZero; i++) {
    			if (direction == this.LEFT)
    				input = '0' + input;
				else
					input += '0';
			}
		}
		
		// initialize array parts
		let parts = [];
		
		// iteration	
		for (index = 0; index < input.length; index++) {
			// get the position (start with 1)
			let position = index + 1;
			
			// check if it was last index of part
			let lastIndexOfPart = (position % length == 0);
			if (lastIndexOfPart && index != 0)
				parts.push(input.slice(position - length, position));	
		}
		
		return parts;
    };
    
    /**
     * convert binary to hexadecimal
     * @param {*} binary 
     */
    this.toHexadecimal = function(binary) {
    	// if possible, split it into 2 parts (before and after a dot) 
		let input = binary.split(".");
		
		/**
		 * do conversion for part 1
		 * get the length of part 1 (before a dot)
		 **/
	 	let part1 = this.splitByLength(input[0], this.LENGTH_HEXADECIMAL, this.LEFT);
        
        let output = '';

        for (i = 0; i < part1.length; i++)
            output += this.binaryToHexadecimal(part1[i]);
        
		// e.g: if input == '1001' or '1001.'
		if (input.length == 1 || input[1] == '')
			return output;
		
		// add a dot since the content after the dot is not empty!
		output += '.';
			
		/**
		 * do conversion for part 2
		 * get the length of part 2 (after a dot)
		 **/
		let part2 = this.splitByLength(input[1], this.LENGTH_HEXADECIMAL, this.RIGHT);

		for (i = 0; i < part2.length; i++)
            output += this.binaryToHexadecimal(part2[i]);
            
        return output;
    };
    
    /**
     * convert binary to octal
     * @param {*} binary 
     */
    this.toOctal = function(binary) {
    	// if possible, split it into 2 parts (before and after a dot)
		let input = binary.split(".");
		
		/**
		 * do conversion for part 1
		 * get the length of part 1 (before a dot)
		 **/
	 	let part1 = this.splitByLength(input[0], this.LENGTH_OCTAL, this.LEFT);
        
        let output = '';

        for (i = 0; i < part1.length; i++)
            output += this.binaryToOctal(part1[i]);
        
		// e.g: if input == '101' or '101.'
		if (input.length == 1 || input[1] == '')
			return output;
		
		// add a dot since the content after the dot is not empty!
		output += '.';
			
		/**
		 * do conversion for part 2
		 * get the length of part 2 (after a dot)
		 **/
		let part2 = this.splitByLength(input[1], this.LENGTH_OCTAL, this.RIGHT);

		for (i = 0; i < part2.length; i++)
            output += this.binaryToOctal(part2[i]);
            
        return output;
    };
}
