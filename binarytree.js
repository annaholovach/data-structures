// Define a class for a binary tree node.
class BinaryTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;       // The key or value associated with the node.
        this.value = value;   // Optional, the value associated with the node (defaults to the key).
        this.parent = parent; // Reference to the parent node (null for the root).
        this.left = null;     // Reference to the left child node.
        this.right = null;    // Reference to the right child node.
    }
}

// Define a class for a binary tree.
class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value); // Create a tree with a root node.
    }

    // Generator function for in-order traversal of the binary tree.
    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left); // Traverse left subtree.
        // Visit the current node.
        yield node;                                             
        if (node.right) yield* this.inOrderTraversal(node.right); // Traverse right subtree.
    }

    // Generator function for post-order traversal of the binary tree.
    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left); // Traverse left subtree.
        if (node.right) yield* this.postOrderTraversal(node.right); // Traverse right subtree.
        // Visit the current node.
        yield node;                                                
    }

    // Generator function for pre-order traversal of the binary tree.
    *preOrderTraversal(node = this.root) {
        // Visit the current node.
        yield node;                                                
        if (node.left) yield* this.preOrderTraversal(node.left);   // Traverse left subtree.
        if (node.right) yield* this.preOrderTraversal(node.right); // Traverse right subtree.
    }

    // Insert a new node with a given key and optional value.
    // Specify whether the new node should be inserted as a left or right child.
    insert(parentNodeKey, key, value = key, { left, right } = { left: true, right: true }) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;

                if (!canInsertLeft && !canInsertRight) return false; // Can't insert.
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node); // Insert as left child.
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node); // Insert as right child.
                    return true;
                }
            }
        }
        return false; // Parent node not found or unable to insert.
    }

    // Find a node with the given key in the binary tree.
    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node; // Return the node if found.
        }
        // Return undefined if not found.
        return undefined; 
    }
}

// Function to check if a binary tree is a binary search tree (BST).
// It validates that all nodes in the tree satisfy the BST property.
function isBinarySearchTree(node, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    if (!node) return true; // An empty tree is a BST.

    if (node.key < min || node.key > max) return false; // Check BST property for the current node.

    // Recursively check the left and right subtrees with updated min and max values.
    return (
        isBinarySearchTree(node.left, min, node.key - 1) &&
        isBinarySearchTree(node.right, node.key + 1, max)
    );
}

const tree = new BinaryTree(1, 'AB')
tree.insert(1, 11, 'AC')
tree.insert(1, 12, 'BC')
tree.insert(12, 121, 'BG', { right: true })

console.log([...tree.preOrderTraversal()].map(x => x.value));
console.log([...tree.inOrderTraversal()].map(x => x.value));
console.log([...tree.postOrderTraversal()].map(x => x.value));

console.log(tree.root.value);
console.log(tree.find(12));
console.log(tree.find(121));
console.log(tree.find(10));

const isBST = isBinarySearchTree(tree.root)
console.log(isBST);