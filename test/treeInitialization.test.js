const expect = require("chai").expect;
const FamilyTree = require("../models/familyTree");

let familyTree = new FamilyTree();

describe("Tree Constructor", () => {
    it("should create king", () => {
        let king = familyTree.getPerson("King Shan");
        expect(king.name).to.equal("King Shan");
    });
    it("should create queen", () => {
        let queen = familyTree.getPerson("Queen Anga");
        expect(queen.name).to.equal("Queen Anga");
    });
});

describe("Add default members", () => {
    familyTree.addDefaultMembers();

    it("should have a valid person", () => {
        let person = familyTree.getPerson("Aras");
        expect(person.name).to.equal("Aras");
    });
    it("should not have an invalid person", () => {
        let person = familyTree.getPerson("Ara");
        expect(typeof(person)).to.equal('undefined');
    });
    it("should have 31 members", () => {
        let allMembers = familyTree.allMembers;
        expect(Object.keys(allMembers).length).to.equal(31);
    });
});