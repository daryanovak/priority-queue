const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		let size = maxSize || 30;
		this.maxSize = size;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.size() == this.maxSize) {
			throw "";
		}
		this.heap.push(data, priority);
	}

	shift() {
		if(this.isEmpty()) {
			throw "";
		}
		let data = this.heap.pop();
		return data;
	}

	size() {
		return this.heap.size();
	}
	
	isEmpty() {
		return this.heap.isEmpty();
	}
}

let q = new PriorityQueue();
q.push(0, 1);
let t = q.shift();

let sum = 0;
for(let i = 0; i < 5; i++) {
	sum += i;
}

module.exports = PriorityQueue;
