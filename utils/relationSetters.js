const Family = require("../models/family");
const strings = require("./strings");

module.exports = {
	addChild: (mother, child, familyTree) => {
		if (mother && mother.gender === strings.femaleString) {
			let family = mother.parentIn;
			// family will be null if not married
			if (family) {
				family.children[child.name] = child;
				child.childIn = family;
				familyTree.setPerson(child.name, child);
				return true;
			}
		}
		return false;
	},

	addPartner: (person, partner, familyTree) => {
		if (!person) return false;
		let isBachelor = !person.parentIn;
		if (person.gender !== partner.gender && isBachelor) {
			if (person.gender === strings.maleString) {
				newFamily = new Family(person, partner, person);
			} else {
				newFamily = new Family(person, person, partner);
			}
			person.parentIn = newFamily;
			partner.parentIn = newFamily;
			familyTree.setPerson(partner.name, partner);
			return true;
		}
		return false;
	},
};