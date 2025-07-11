class BSTNode<T> {
	value: T;
	leftNode: BSTNode<T> | null;
	rightNode: BSTNode<T> | null;

	constructor(value: T) {
		this.value = value;
		this.leftNode = null;
		this.rightNode = null;
	}
}

class BST<T> {
	private root: BSTNode<T> | null;

	constructor() {
		this.root = null;
	}

	isEmpty(): boolean {
		return this.root === null;
	}

	insert(value: T): void {
		const newNode = new BSTNode(value);

		if (!this.root) {
			this.root = newNode;
			return;
		}

		let current: BSTNode<T> | null = this.root;

		while (current) {
			if (value === current.value) {
				// Handle duplicate
				return;
			} else if (value < current.value) {
				if (current.leftNode === null) {
					current.leftNode = newNode;
					return;
				}
				current = current.leftNode;
			} else {
				if (current.rightNode === null) {
					current.rightNode = newNode;
					return;
				}
				current = current.rightNode;
			}
		}
	}

	search(value: T): boolean {
		let current: BSTNode<T> | null = this.root;

		while (current) {
			if (value === current.value) {
				return true;
			} else if (value < current.value) {
				current = current.leftNode;
			} else {
				current = current.rightNode;
			}
		}

		return false;
	}

	min(): T | null {
		if (!this.root) {
			return null;
		}

		let current: BSTNode<T> | null = this.root;
		while (current.leftNode !== null) {
			current = current.leftNode;
		}

		return current.value;
	}

	max(): T | null {
		if (!this.root) {
			return null;
		}

		let current: BSTNode<T> | null = this.root;
		while (current.rightNode !== null) {
			current = current.rightNode;
		}

		return current.value;
	}
}