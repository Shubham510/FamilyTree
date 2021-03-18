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
})