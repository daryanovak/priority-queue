const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size_ = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.size_++;
	}

	pop() {
		if(this.isEmpty()) {
			return;
		}
		let data = this.root.data;
		
		let detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		this.size_--;
		
		return data;
	}

	detachRoot() {
		let root = this.root;
		this.root = null;
		for(let i = 0; i < this.parentNodes.length; i++) {
			if(this.parentNodes[i] == root) {
				this.parentNodes.splice(i, 1);
				break;
			}
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(this.parentNodes.length == 0) {
			return;
		}
		let node = this.parentNodes.pop();
		if(node.parent != null && node.parent != detached && node.parent.right == node) {
			this.parentNodes.unshift(node.parent);
		}
		node.remove();
		
		this.root = node;
		if(detached.left != null) {
			this.root.left = detached.left;
			detached.left.parent = this.root;
		}
		if(detached.right != null) {
			this.root.right = detached.right;
			detached.right.parent = this.root;
		}
		if(this.root.left == null || this.root.right == null) {
			this.parentNodes.unshift(this.root);
		}
	}

	size() {
		return this.size_;
	}

	isEmpty() {
		return this.size_ == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.size_ = 0;
	}

	insertNode(node) {
		if(this.root == null) {
			this.root = node;
		}
		else {
			let parent_node = this.parentNodes[0];
			parent_node.appendChild(node);
			if(parent_node.left != null && parent_node.right != null) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(node.parent != null && node.priority > node.parent.priority) {
			//swap parentNodes
			let nIndex = -1, pIndex = -1;
			for(let i = 0; i < this.parentNodes.length; i++) {
				if(this.parentNodes[i] == node) {
					nIndex = i;
				}
				if(this.parentNodes[i] == node.parent) {
					pIndex = i;
				}
			}
			if(nIndex != -1 && pIndex != -1) {
				let temp_ = this.parentNodes[nIndex];
				this.parentNodes[nIndex] = this.parentNodes[pIndex];
				this.parentNodes[pIndex] = temp_;
			}
			else if(nIndex != -1) {
				this.parentNodes[nIndex] = node.parent;
			}
			
			if(node.parent == this.root) {
				this.root = node;
			}
			
			//swap nodes
			node.swapWithParent();
			
			//call recursively
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if(node == null) {
			return;
		}
		let nodeToSwap = null;
		if(node.left != null && node.right != null) {
			if(node.left.priority > node.right.priority) {
				if(node.priority < node.left.priority) {
					nodeToSwap = node.left;
				}
				else {
					return;
				}
			}
			else {
				if(node.priority < node.right.priority) {
					nodeToSwap = node.right;
				}
				else {
					return;
				}
			}
		}
		else if(node.left != null) {
			if(node.priority < node.left.priority) {
				nodeToSwap = node.left;
			}
			else {
				return;
			}
		}
		else if(node.right != null) {
			if(node.priority < node.right.priority) {
				nodeToSwap = node.right;
			}
			else {
				return;
			}
		}
		else {
			return;
		}
		
		//swap parentNodes
		let nIndex = -1, pIndex = -1;
		for(let i = 0; i < this.parentNodes.length; i++) {
			if(this.parentNodes[i] == node) {
				pIndex = i;
			}
			if(this.parentNodes[i] == nodeToSwap) {
				nIndex = i;
			}
		}
		if(nIndex != -1 && pIndex != -1) {
			let temp_ = this.parentNodes[nIndex];
			this.parentNodes[nIndex] = this.parentNodes[pIndex];
			this.parentNodes[pIndex] = temp_;
		}
		else if(nIndex != -1) {
			this.parentNodes[nIndex] = node;
		}
		
		if(nodeToSwap.parent == this.root) {
			this.root = nodeToSwap;
		}
		
		//swap nodes
		nodeToSwap.swapWithParent();
		
		//call recursively
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
