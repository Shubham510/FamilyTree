const Family = require("./family");
const Person = require("./Person");
const commands = require("../utils/InitializeTree");
const utils = require("../utils/commandProcessor");

module.exports = class FamilyTree {
	constructor() {
		let king = new Person("King Shan", "Male");
		let queen = new Person("Queen Anga", "Female");
		this.rootFamily = new Family(null, queen, king);
		king.parentIn = this.rootFamily;
		queen.parentIn = this.rootFamily;
		this.allMembers = {
			"King Shan": king,
			"Queen Anga": queen,
		};
	}

	addDefaultMembers() {
		// Initialize the Family tree with given data
		utils.processCommands(commands.commandsToInitializeTree, this);
	}

	getPerson(name) {
		return this.allMembers[name];
	}

	setPerson(name, personObject) {
		this.allMembers[name] = personObject;
	}
};