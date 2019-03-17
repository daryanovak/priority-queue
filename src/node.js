class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left == null) {
			this.left = node;
			node.parent = this;
		}
		else if(this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(node == this.left) {
			node.parent = null;
			this.left = null;
		}
		else if(node == this.right) {
			node.parent = null;
			this.right = null;
		}
		else {
			throw "";
		}
	}

	remove() {
		if(this.parent == null) {
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent == null) {
			return;
		}
		let my_parent = this.parent;
		if(my_parent.parent != null) {
			if(my_parent.parent.left == my_parent) {
				my_parent.parent.left = this;
			}
			else {
				my_parent.parent.right = this;
			}
		}
		this.parent = my_parent.parent;
		
		let parent_left = my_parent.left;
		let parent_right = my_parent.right;
		
		my_parent.left = this.left;
		if(this.left != null) {
			this.left.parent = my_parent;
		}
		my_parent.right = this.right;
		if(this.right != null) {
			this.right.parent = my_parent;
		}
		
		if(parent_left == this) {
			this.left = my_parent;
			this.right = parent_right;
			if(this.right != null) {
				this.right.parent = this;
			}
		}
		else {
			this.right = my_parent;
			this.left = parent_left;
			if(this.left != null) {
				this.left.parent = this;
			}
		}
		my_parent.parent = this;
	}
}

module.exports = Node;
