const { Queue } = require('./queue')
const {Stack} = require('./stack')

class Node {
    constructor(value) {
        // The value associated with the node.
        this.value = value; 
        // An array to store references to adjacent nodes.     
        this.adjacents = []; 
    }

    // Add an adjacent node to this node.
    addAdjacent(node) {
        this.adjacents.push(node);
    }

    // Get the array of adjacent nodes.
    getAdjacents() {
        return this.adjacents;
    }
}

class Graph {
    constructor(edgeDirection = Graph.DIRECTED) {
        this.nodes = new Map();        // A map to store nodes, where keys are node values.
        this.edgeDirection = edgeDirection;  // Specifies whether the graph is directed or undirected.
    }

    // Add an edge between two nodes (vertices) in the graph.
    addEdge(source, destination) {
        // Create or get nodes for the source and destination.
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);

        sourceNode.addAdjacent(destinationNode);

        // If the graph is undirected, add an edge in the reverse direction as well.
        if (this.edgeDirection === Graph.UNDIRECTED) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode]; // Return the nodes representing the edge.
    }

    // Add a vertex (node) to the graph.
    addVertex(value) {
        if (this.nodes.has(value)) {
            return this.nodes.get(value);
        } else {
            const vertex = new Node(value);
            this.nodes.set(value, vertex);
            return vertex;
        }
    }

    // Generator function for breadth-first search traversal of the graph.
    *bfs(first) {
        const visited = new Map();
        const visitList = new Queue();

        visitList.enqueue(first);

        while (!visitList.isEmpty()) {
            const node = visitList.dequeue();
            if (node && !visited.has(node)) {
                yield node;
                visited.set(node);
                node.getAdjacents().forEach(adj => visitList.enqueue(adj));
            }
        }
    }

    // Generator function for depth-first search traversal of the graph.
    *dfs(first) {
        const visited = new Map();
        const visitList = new Stack();

        visitList.push(first);

        while (!visitList.isEmpty()) {
            const node = visitList.pop();
            if (node && !visited.has(node)) {
                yield node;
                visited.set(node);
                node.getAdjacents().forEach(adj => visitList.push(adj));
            }
        }
    }
}

// Function to find the lowest cost path between two nodes in the graph.
function findLowestCostNode(graph, startValue, endValue) {
    // Initialize data structures for Dijkstra's algorithm.
    const distance = {};    // Map to store the distance from the start node to each node.
    const previous = {};    // Map to store the previous node on the shortest path.
    const unvisited = new Set(); // Set to keep track of unvisited nodes.

    // Initialize distance, previous, and unvisited sets.
    for (const nodeValue of graph.nodes.keys()) {
        distance[nodeValue] = Infinity;
        previous[nodeValue] = null;
        unvisited.add(nodeValue);
    }

    distance[startValue] = 0;

    // Main loop of Dijkstra's algorithm.
    while (unvisited.size > 0) {
        // Find the unvisited node with the smallest known distance.
        let minNode = null;
        for (const nodeValue of unvisited) {
            if (!minNode || distance[nodeValue] < distance[minNode]) {
                minNode = nodeValue;
            }
        }
        if (distance[minNode] === Infinity) {
            break; // No more reachable nodes.
        }
        unvisited.delete(minNode);

        // Update distances to neighbors if a shorter path is found.
        for (const neighborNode of graph.nodes.get(minNode).getAdjacents()) {
            const alt = distance[minNode] + 1; // Assuming unweighted edges.
            if (alt < distance[neighborNode.value]) {
                distance[neighborNode.value] = alt;
                previous[neighborNode.value] = minNode;
            }
        }
    }

    // Reconstruct the shortest path using the "previous" map.
    const path = [];
    let current = endValue;
    while (previous[current] !== null) {
        path.unshift(current);
        current = previous[current];
    }

    // Check if a valid path exists.
    if (path.length === 0 || path[0] !== startValue) {
        return null;
    }
    path.unshift(startValue);
    return path;
}

const graph = new Graph(Graph.UNDIRECTED);

const [first] = graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);

const shortestPath = findLowestCostNode(graph, 7, 8)

// Check if shortestPath is not null
// If shortestPath is not null, iterate over its values and log each nodeValue
// If shortestPath is null, log 'no path'
shortestPath ? shortestPath.forEach(nodeValue => console.log(nodeValue)) : console.log('no path');

bfsFromFirst = graph.bfs(first);
console.log(bfsFromFirst.next().value.value);
console.log(bfsFromFirst.next().value.value);
console.log(bfsFromFirst.next().value.value);
console.log(bfsFromFirst.next().value.value);

// Start a DFS traversal from the 'first' node.
dfsFromFirst = graph.dfs(first);
// Convert the DFS traversal order to an array of visited nodes.
visitedOrder = Array.from(dfsFromFirst);
// Extract the values of visited nodes.
const values = visitedOrder.map(node => node.value);
console.log(values);