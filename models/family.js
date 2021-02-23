module.exports = class Family {
	constructor(root, mother, father) {
		this.root = root;
		this.mother = mother;
		this.father = father;
		this.children = {};
	}
};