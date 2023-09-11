class Queue {
    constructor() {
        // Initialize an empty object to store elements.
        this.elements = {};
        // Initialize the head and tail pointers to 0.
        this.head = 0;
        this.tail = 0;
    }

    // Enqueue (add) an element to the end of the queue.
    enqueue(elem) {
        // Store the element at the current tail index in the elements object.
        this.elements[this.tail] = elem;
        // Increment the tail pointer to point to the next available position.
        this.tail++;
    }

    // Dequeue (remove) and return the element from the front of the queue.
    dequeue() {
        // Retrieve the element at the current head index.
        const item = this.elements[this.head];
        // Delete the element from the elements object.
        delete this.elements[this.head];
        // Increment the head pointer to point to the next element in the queue.
        this.head++;
        // Return the dequeued item.
        return item;
    }

    // Peek at the element at the front of the queue without removing it.
    peek() {
        // Return the element at the current head index.
        return this.elements[this.head];
    }

    // Get the current length (number of elements) of the queue.
    get length() {
        // Calculate the length by subtracting the head index from the tail index.
        return this.tail - this.head;
    }

    // Check if the queue is empty.
    isEmpty() {
        // The queue is empty if the length is 0.
        return this.length === 0;
    }
}

module.exports = {Queue}

// only run when the file is executed directly as the main script, not when it is imported as a module
if (require.main === module) {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.peek());
    console.log(queue.isEmpty());
}
