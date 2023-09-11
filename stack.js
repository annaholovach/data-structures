class Stack {
    // The constructor initializes the stack with optional initial elements passed as arguments.
    constructor(...args) {
        // Initialize the stack as an array containing the provided elements.
        this.stack = [...args]
    }

    // Push a new element onto the stack.
    push(elem) {
        this.stack.push(elem)
    }

    // Pop and return the top element from the stack.
    pop() {
        return this.stack.pop()
    }

     // Return the top element of the stack.
    peek() {
        return this.stack.slice(-1)[0]
    }

    // Check if the stack is empty.
    isEmpty() {
        return this.stack.length === 0
    }
}

class MinMaxStack {
    constructor() {
        // Initialize an array to store the data elements.
        this.data = [];
        // Initialize the size of the stack.
        this.size = 0;
        // Initialize arrays to track the maximum and minimum values at each stack size.
        this.maxValues = [];
        this.minValues = [];
    }

    // Push a new element onto the stack while keeping track of maximum and minimum values.
    push(elem) {
        // If the stack is empty or the new element is greater than the current max value, push the new element.
        if (this.size === 0 || elem >= this.findMax()) {
            this.maxValues.push(elem);
        } else {
            // Otherwise, push the current max value again to maintain the same max value.
            this.maxValues.push(this.findMax());
        }

        // If the stack is empty or the new element is less than the current min value, push the new element.
        if (this.size === 0 || elem <= this.findMin()) {
            this.minValues.push(elem);
        } else {
            // Otherwise, push the current min value again to maintain the same min value.
            this.minValues.push(this.findMin());
        }

        // Increase the stack size and push the new element to the data stack.
        this.size++;
        this.data.push(elem);
        // Return the updated data array.
        return this.data;
    }

    // Pop and return the top element from the stack, updating max and min values accordingly.
    pop() {
        if (this.size > 0) {
            // Decrease the stack size and pop the max and min value tracking arrays.
            this.size--;
            this.maxValues.pop();
            this.minValues.pop();
            // Return the top element from the data stack.
            return this.data.pop();
        }
    }

    // Find and return the maximum value in the stack.
    findMax() {
        // Access the last element in the maxValues array, which stores max values at each stack size.
        return this.maxValues[this.size - 1];
    }

    // Find and return the minimum value in the stack.
    findMin() {
        // Access the last element in the minValues array, which stores min values at each stack size.
        return this.minValues[this.size - 1];
    }
}

module.exports = {Stack}

// only run when the file is executed directly as the main script, not when it is imported as a module
if (require.main === module) {
    const stack = new Stack(1, 2)
    stack.push(3)
    stack.push(6)
    stack.push(9)
    console.log(stack.peek());
    stack.pop()
    console.log(stack.peek());
    console.log(stack.isEmpty());

    const minMaxStack = new MinMaxStack()
    minMaxStack.push(5)
    minMaxStack.push(3)
    minMaxStack.push(6)
    minMaxStack.push(4)
    console.log(minMaxStack.findMax());
    console.log(minMaxStack.findMin());
}