const {expect} = require("chai");
const FamilyTree = require("../models/familyTree");

let familyTree = new FamilyTree();
familyTree.addDefaultMembers();

describe("Get first level family members", () => {
    describe("Get Father", () => {
        it("should not return father for King", () => {
            let king = familyTree.getPerson("King Shan");
            let father = king.get("Father");
            expect(father.length).to.equal(0);
        });
        it("should return the correct father", () => {
            let person = familyTree.getPerson("Ish");
            let father = person.get("Father");
            expect(father[0].name).to.equal("King Shan");
        });
    });
    describe("Get Mother", () => {
        it("should not return mother for King", () => {
            let king = familyTree.getPerson("King Shan");
            let mother = king.get("Mother");
            expect(mother.length).to.equal(0);
        });
        it("should return the correct mother", () => {
            let person = familyTree.getPerson("Ish");
            let mother = person.get("Mother");
            expect(mother[0].name).to.equal("Queen Anga");
        });
    });
    describe("Get Son", () => {
        it("should not return son for singles", () => {
            let person = familyTree.getPerson("Atya");
            let son = person.get("Son");
            expect(son.length).to.equal(0);
        });
        it("should return the correct son", () => {
            let person = familyTree.getPerson("Chit");
            let son = person.get("Son");
            expect(son[0].name).to.equal("Vritha");
        });
    });
    describe("Get Daughter", () => {
        it("should not return son for singles", () => {
            let person = familyTree.getPerson("Atya");
            let daughter = person.get("Daughter");
            expect(daughter.length).to.equal(0);
        });
        it("should return the correct son", () => {
            let person = familyTree.getPerson("Chit");
            let daughter = person.get("Daughter");
            expect(daughter[0].name).to.equal("Dritha");
        });
    });
    describe("Get Siblings", () => {
        it("should not return siblings for single child", () => {
            let person = familyTree.getPerson("Vasa");
            let siblings = person.get("Siblings");
            expect(siblings.length).to.equal(0);
        });
        it("should return all the siblings", () => {
            let person = familyTree.getPerson("Aras");
            let siblings = person.get("Siblings");
            expect(siblings.length).to.equal(4);
        });
    });
    describe("Get Spouse", () => {
        it("should not return spouse for singles", () => {
            let person = familyTree.getPerson("Ish");
            let spouse = person.get("Spouse");
            expect(typeof(spouse)).to.equal("undefined");
        });
        it("should return the spouse", () => {
            let person = familyTree.getPerson("Aras");
            let spouse = person.get("Spouse");
            expect(spouse.name).to.equal("Chitra");
        });
    });
});

describe("Get higher level relations", () => {
    describe("Get Paternal Uncle", () => {
        it("should not return any paternal uncle", () => {
            let person = familyTree.getPerson("Laki");
            let uncle = person.get("Paternal-Uncle");
            expect(uncle.length).to.equal(0);
        });
        it("should return all paternal uncles", () => {
            let person = familyTree.getPerson("Vila");
            let uncle = person.get("Paternal-Uncle");
            expect(uncle.length).to.equal(3);
        });
    });
    describe("Get Paternal Aunt", () => {
        it("should not return any paternal aunt", () => {
            let person = familyTree.getPerson("Laki");
            let aunt = person.get("Paternal-Aunt");
            expect(aunt.length).to.equal(0);
        });
        it("should return all paternal aunts", () => {
            let person = familyTree.getPerson("Vila");
            let aunt = person.get("Paternal-Aunt");
            expect(aunt.length).to.equal(1);
        });
    });
    describe("Get Maternal Uncle", () => {
        it("should not return any maternal uncle", () => {
            let person = familyTree.getPerson("Vasa");
            let uncle = person.get("Maternal-Uncle");
            expect(uncle.length).to.equal(0);
        });
        it("should return all maternal uncles", () => {
            let person = familyTree.getPerson("Vyas");
            let uncle = person.get("Maternal-Uncle");
            expect(uncle.length).to.equal(4);
        });
    });
    describe("Get Maternal Aunt", () => {
        it("should not return any maternal aunt", () => {
            let person = familyTree.getPerson("Ish");
            let aunt = person.get("Maternal-Aunt");
            expect(aunt.length).to.equal(0);
        });
        it("should return all maternal aunts", () => {
            let person = familyTree.getPerson("Yodhan");
            let aunt = person.get("Maternal-Aunt");
            expect(aunt.length).to.equal(1);
        });
    });
    describe("Get Brother-In-Law", () => {
        it("should not return any Brother-In-Law", () => {
            let person = familyTree.getPerson("Dritha");
            let brotherInLaw = person.get("Brother-In-Law");
            expect(brotherInLaw.length).to.equal(0);
        });
        it("should return all Brothers-In-Law (Spouse's Brothers)", () => {
            let person = familyTree.getPerson("Vyan");
            let brotherInLaw = person.get("Brother-In-Law");
            expect(brotherInLaw.length).to.equal(4);
        });
        it("should return all Brothers-In-Law (Husbands of Sisters)", () => {
            let person = familyTree.getPerson("Ahit");
            let brotherInLaw = person.get("Brother-In-Law");
            expect(brotherInLaw.length).to.equal(1);
        });
    });
    describe("Get Sister-In-Law", () => {
        it("should not return any Sister-In-Law (Spouse's Sisters)", () => {
            let person = familyTree.getPerson("Laki");
            let sisterInLaw = person.get("Sister-In-Law");
            expect(sisterInLaw.length).to.equal(0);
        });
        it("should return all Sisters-In-Law (Wives of Brothers)", () => {
            let person = familyTree.getPerson("Vyas");
            let sisterInLaw = person.get("Sister-In-Law");
            expect(sisterInLaw.length).to.equal(1);
        });
        it("should return all Sisters-In-Law", () => {
            let person = familyTree.getPerson("Lika");
            let sisterInLaw = person.get("Sister-In-Law");
            expect(sisterInLaw.length).to.equal(1);
        });
    });
    describe("Get Grandfather", () => {
        it("should not return Grandfather", () => {
            let person = familyTree.getPerson("Vich");
            let grandfather = person.get("Grandfather");
            expect(grandfather.length).to.equal(0);
        });
        it("should return Grandfather", () => {
            let person = familyTree.getPerson("Laki");
            let grandfather = person.get("Grandfather");
            expect(grandfather[0].name).to.equal("Aras");
        });
    });
    describe("Get Grandmother", () => {
        it("should not return Grandmother", () => {
            let person = familyTree.getPerson("Ish");
            let grandmother = person.get("Grandmother");
            expect(grandmother.length).to.equal(0);
        });
        it("should return Grandmother", () => {
            let person = familyTree.getPerson("Kriya");
            let grandmother = person.get("Grandmother");
            expect(grandmother[0].name).to.equal("Satya");
        });
    });
})