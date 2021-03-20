const strings = require("./strings");

module.exports = {
	father: (person) => {
		let family = person.childIn;
		if (family) return [family.father];
		return [];
	},

	mother: (person) => {
		let family = person.childIn;
		if (family) return [family.mother];
		return [];
	},

	son: (person) => {
		let outputArr = [];
		let family = person.parentIn;
		if (family) {
			for (let childName in family.children) {
				if (family.children[childName].gender === strings.maleString) {
					outputArr.push(family.children[childName]);
				}
			}
		}
		return outputArr;
	},

	daughter: (person) => {
		let outputArr = [];
		let family = person.parentIn;
		if (family) {
			for (let childName in family.children) {
				if (family.children[childName].gender === strings.femaleString) {
					outputArr.push(family.children[childName]);
				}
			}
		}
		return outputArr;
	},

	siblings: (person) => {
		let outputArr = [];
		let family = person.childIn;
		if (family) {
			for (let childName in family.children) {
				if (person.name !== childName) outputArr.push(family.children[childName]);
			}
		}
		return outputArr;
	},

	paternalUncle: (person) => {
		let father = person.get("Father")[0];
		if (father) {
			let grandFather = father.get("Father")[0];
			if (grandFather) {
				let uncles = grandFather.get("Son");
				uncles = uncles.filter((uncle) => uncle.name !== father.name);
				return uncles;
			}
		}
		return [];
	},

	maternalUncle: (person) => {
		let mother = person.get("Mother")[0];
		if (mother) {
			let grandFather = mother.get("Father")[0];
			if (grandFather) {
				let uncles = grandFather.get("Son");
				return uncles;
			}
		}
		return [];
	},

	paternalAunt: (person) => {
		let father = person.get("Father")[0];
		if (father) {
			let grandFather = father.get("Father")[0];
			if (grandFather) {
				let aunts = grandFather.get("Daughter");
				return aunts;
			}
		}
		return [];
	},

	maternalAunt: (person) => {
		let mother = person.get("Mother")[0];
		if (mother) {
			let grandFather = mother.get("Father")[0];
			if (grandFather) {
				let aunts = grandFather.get("Daughter");
				aunts = aunts.filter((aunt) => aunt.name !== mother.name);
				return aunts;
			}
		}
		return [];
	},

	spouse: (person) => {
		let family = person.parentIn;
		if (family) {
			if (person.gender === strings.maleString) return family.mother;
			else return family.father;
		}
	},

	sisterInLaw: (person) => {
		let outputArr = [];
		// Spouse's Sisters
		let spouse = person.get("Spouse");
		if (spouse) {
			let fatherInLaw = spouse.get("Father")[0];
			if (fatherInLaw) {
				let sistersInLaw = fatherInLaw.get("Daughter");
				sistersInLaw.map((sister) => {
					if (sister.name !== spouse.name) outputArr.push(sister);
				});
			}
		}
		// Wives of Brothers
		let father = person.get("Father")[0];
		if (father) {
			let brothers = father.get("Son");
			brothers.map((brother) => {
				if (brother.name !== person.name) {
					let wife = brother.get("Spouse");
					if (wife) outputArr.push(wife);
				}
			});
		}
		return outputArr;
	},

	brotherInLaw: (person) => {
		let outputArr = [];
		// Spouse's Brothers
		let spouse = person.get("Spouse");
		if (spouse) {
			let fatherInLaw = spouse.get("Father")[0];
			if (fatherInLaw) {
				let brothersInLaw = fatherInLaw.get("Son");
				brothersInLaw.map((brother) => {
					if (brother.name !== spouse.name) outputArr.push(brother);
				});
			}
		}
		// Husbands of Sisters
		let father = person.get("Father")[0];
		if (father) {
			let sisters = father.get("Daughter");
			sisters.map((sister) => {
				if (sister.name !== person.name) {
					let husband = sister.get("Spouse");
					if (husband) outputArr.push(husband);
				}
			});
		}
		return outputArr;
	},
	grandfather: (person) => {
		let outputArr =[];
		let childInFamily = person.childIn;
		if (childInFamily) {
			let rootParent = childInFamily.root;
			if(rootParent){
				let grandfather = rootParent.childIn.father;
				outputArr.push(grandfather);
			}
		}
		return outputArr;
	},
	grandmother: (person) => {
		let outputArr=[];
		let childInFamily = person.childIn;
		if (childInFamily) {
			let rootParent = childInFamily.root;
			if(rootParent){
				let grandmother = rootParent.childIn.mother;
				outputArr.push(grandmother);
			}
		}
		return outputArr;
	}
};