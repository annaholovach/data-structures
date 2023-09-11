// Define a class for a single node in the linked list.
class LinkedListNode {
    constructor(value, next = null) {
        // The value stored in the node.
        this.value = value;
        // Reference to the next node in the list (default is null). 
        this.next = next;    
    }
}

class LinkedList {
    constructor() {
        // Reference to the first node (initially null).
        this.head = null;
        // Reference to the last node (initially null).  
        this.tail = null;
    }

    // Add a new node with the given value to the beginning of the linked list.
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        // Update the head to point to the new node.
        this.head = newNode;  
        if (!this.tail) {
            // If the list was empty, update the tail as well.
            this.tail = newNode;  
        }
        // Return the modified linked list.
        return this; 
    }

    // Add a new node with the given value to the end of the linked list.
    append(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head || !this.tail) {
            // If the list is empty, set both head and tail to the new node.
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        // Update the current tail node's next reference.
        this.tail.next = newNode;
        // Update the tail to point to the new node.  
        this.tail = newNode;
        // Return the modified linked list.       
        return this;  
    }

    // Delete the first occurrence of a node with the specified value.
    delete(value) {
        if (!this.head) {
            // If the list is empty, nothing to delete.
            return null;  
        }
        let deleteNode = null;

        // Handle deletion at the beginning of the list (potentially multiple times).
        while (this.head && this.head.value === value) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deleteNode = currentNode.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Update the tail if it was deleted.
        if (this.tail && this.tail.value === value) {
            this.tail = currentNode;
        }
        // Return the deleted node (or null if not found).
        return deleteNode;  
    }

    // Find the first node with the specified value and return it.
    find(value) {
        if (!this.head) {
            // If the list is empty, nothing to find.
            return null;  
        }
        let currentNode = this.head;
        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                // Return the found node.
                return currentNode;  
            }
            // Move to the next node.
            currentNode = currentNode.next;  
        }
        // Return null if the value is not found.
        return null;  
    }

    // Delete the last node in the linked list and update the tail.
    deleteTail() {
        if (!this.tail) {
            // If the list is empty, nothing to delete.
            return null;  
        }
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            // If there's only one node, update both head and tail.
            this.tail = null;  
        } else {
            let currentNode = this.head;
            while (currentNode.next) {
                if (!currentNode.next.next) {
                    // Remove the reference to the last node.
                    currentNode.next = null;  
                } else {
                    currentNode = currentNode.next;
                }
            }
            // Update the tail to the new last node.
            this.tail = currentNode;  
        }
        // Return the deleted tail node.
        return deletedTail;  
    }

    // Delete the first node in the linked list and update the head.
    deleteHead() {
        if (!this.head) {
            // If the list is empty, nothing to delete.
            return null;  
        }
        const deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            // If there's only one node, update both head and tail.
            this.tail = null;  
        }
        // Return the deleted head node.
        return deletedHead;  
    }
}

// Implement Floyd's Tortoise and Hare algorithm to detect a loop in the linked list.
function tortoiseHareAlghoritm(graph) {
    let tortoise = graph.head;
    let hare = graph.head;

    while (true) {
        tortoise = tortoise.next;
        hare = hare.next;
        if (hare === null || hare.next === null) {
            // No loop detected.
            return null;  
        } else {
            hare = hare.next;
        }

        if (tortoise === hare) {
            // Loop detected.
            break;  
        }
    }

    tortoise = graph.head;
    while (tortoise !== hare) {
        tortoise = tortoise.next;
        hare = hare.next;
    }
    // Return the node where the loop begins (or null if no loop).
    return tortoise;  
}

const linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.append(5)
linkedList.prepend(20)
console.log(linkedList);
linkedList.delete(20)
linkedList.delete(1)
console.log(linkedList);
console.log(linkedList.find(4));
linkedList.deleteHead()
linkedList.deleteTail()
console.log(linkedList);

let current = linkedList.head
while(current.next) {
    current = current.next
}
current.next = linkedList.head.next
const cycle = tortoiseHareAlghoritm(linkedList)
cycle ? console.log(`${cycle.value}`) : console.log('cycle not found');