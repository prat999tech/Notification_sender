class apierror extends Error { // Line 1: Class definition and inheritance
    constructor( // Line 2: Constructor start
        statusCode, // Line 3: statusCode parameter
        message= "Something went wrong", // Line 4: message parameter with default value
        errors = [], // Line 5: errors parameter with default value
        stack = "" // Line 6: stack parameter with default value
    ){ // Line 7: Constructor body start
        super(message) // Line 8: Call parent class constructor
        this.statusCode = statusCode // Line 9: Assign statusCode to instance
        this.data = null // Line 10: Assign null to data property of instance
        this.message = message // Line 11: Assign message to instance (redundant)
        this.success = false; // Line 12: Assign false to success property of instance
        this.errors = errors // Line 13: Assign errors array to instance

        if (stack) { // Line 14: Check if a stack trace was provided
            this.stack = stack // Line 15: Use the provided stack trace
        } else{ // Line 16: If no stack trace was provided
            Error.captureStackTrace(this, this.constructor) // Line 17: Capture a new stack trace
        }

    } // Line 19: Constructor body end
} // Line 20: Class definition end
