const relationGetters = require("../utils/relationGetters");
const relationSetters = require("../utils/relationSetters");

module.exports = class Person {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
		this.childIn = null;
		this.parentIn = null;

		// Route requests to relation getters and setters functions
		this.getters = {
			Father : relationGetters.father,
			Mother: relationGetters.mother,
			"Paternal-Uncle": relationGetters.paternalUncle,
			"Paternal-Aunt": relationGetters.paternalAunt,
			"Maternal-Uncle": relationGetters.maternalUncle,
			"Maternal-Aunt": relationGetters.maternalAunt,
			"Sister-In-Law": relationGetters.sisterInLaw,
			"Brother-In-Law": relationGetters.brotherInLaw,
			Son: relationGetters.son,
			Daughter: relationGetters.daughter,
			Siblings: relationGetters.siblings,
			Spouse: relationGetters.spouse,
		};

		this.setters = {
			ADD_CHILD: relationSetters.addChild,
			ADD_PARTNER: relationSetters.addPartner,
		};
	}

	get(relation) {
		return this.getters[relation](this);
	}

	set(relation, person, familyTree) {
		return this.setters[relation](this, person, familyTree);
	}
};