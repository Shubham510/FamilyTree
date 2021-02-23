const Person = require("../models/Person");
const strings = require("./strings");

// calls necessary functions for corresponding commands
module.exports.processCommands = (commands, familyTree, verbose) => {
	commands.map((command) => {
		words = command.split(" ");
		let commandType = words[0];
		if (commandType === strings.addChildCommand || commandType === strings.addPartnerCommand) {
			let [firstName, newMemberName, newMemberGender] = this.getArgs(words);
			let firstPerson = this.getPersonWrapper(firstName, familyTree);

			if (firstPerson) {
				let newPerson = new Person(newMemberName, newMemberGender);
				let additionStatus = firstPerson.set(commandType, newPerson, familyTree);
				verbose && this.printAdditionOutput(additionStatus);
			}
		} else if (commandType === strings.getRelationShipCommand) {
			let [personName, relation] = this.getArgs(words);
			let person = this.getPersonWrapper(personName, familyTree);
			person && this.printRelationShipOutput(person.get(relation));
		}
	});
};

// Check the person is part of the family
module.exports.getPersonWrapper = (personName, familyTree) => {
	let person = familyTree.getPerson(personName);
	if (!person) console.log(strings.personNotFound);
	return person;
};

// Print the outputs
module.exports.printAdditionOutput = (status) => {
	let output = status ? strings.childAdditionSucceded : strings.childAdditionFailed;
	console.log(output);
};

module.exports.printRelationShipOutput = (persons) => {
	if (persons.length === 0) console.log(strings.noRelation);
	else {
		let output = "";
		persons.map((person) => {
			output += person.name + " ";
		});
		console.log(output);
	}
};

// Process arguments for the main function
module.exports.getArgs = (words) => {
	let counter = 0;
	let commandType = words[counter++];
	let firstName = words[counter++];

	// Only King and Queen have 2 worded names. Hence handling the exception
	if (firstName === "King" || firstName === "Queen") firstName += " " + words[counter++];

	if (commandType === strings.addChildCommand || commandType === strings.addPartnerCommand) {
		let newMemberName = words[counter++];
		let newMemberGender = words[counter];
		return [firstName, newMemberName, newMemberGender];
	} else if (commandType === strings.getRelationShipCommand) {
		let relation = words[counter].toString();
		return [firstName, relation];
	}
};