// Define a class for a single node in the linked list.
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;    
    }

    toString() {
        return `${this.value}`
    }
}

class LinkedList {
    constructor() {
        this.head = null; 
        this.tail = null;
    }

    // Add a new node with the given value to the beginning of the linked list.
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    // Add a new node with the given value to the end of the linked list.
    append(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head || !this.tail) {
            // Якщо список порожній, оновлюємо як голову, так і хвіст до нового вузла.
            this.head = newNode;
            this.tail = newNode;
            return this 
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    toArray() {
        const nodes = []
        let currentNode = this.head
        while(currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
        return nodes
    }

    toString() {
        return this.toArray().map(node => node.toString()).toString()
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
                    currentNode.next = currentNode.next.next
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Update the tail if it was deleted.
        if (this.tail?.value === value) {
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
            if (currentNode.value === value) {
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
function tortoiseHareAlghoritm(head) {
    if(!head || !head.next) {
        return false
    }

    let tortoise = head;
    let hare = head;

    while (hare && hare.next) {
        tortoise = tortoise.next;
        hare = hare.next.next;

        if (tortoise === hare) {
            return true  
        }
    }

    return false 
}

const linkedList = new LinkedList()
linkedList.append('a').append('b').append('c').append('d')
console.log(JSON.stringify(linkedList));
console.log(linkedList.find('c'));
linkedList.delete('c')
console.log(JSON.stringify(linkedList));
linkedList.append('e').append('f')
console.log(JSON.stringify(linkedList));
linkedList.deleteHead()
linkedList.deleteTail()
console.log(JSON.stringify(linkedList));
console.log(tortoiseHareAlghoritm(linkedList));

// const list = new LinkedList()
// list.prepend(1).prepend(2).prepend(3)
// console.log(JSON.stringify(list));


let current = linkedList.head
while(current.next) {
    current = current.next
}
current.next = linkedList.head.next
const cycle = tortoiseHareAlghoritm(linkedList)
if(cycle) {
    console.log(`cycle in ${cycle.value}`)
} else {
    console.log('cycle not found')
}


