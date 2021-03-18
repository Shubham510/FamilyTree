const { expect } = require("chai")
const FamilyTree = require("../models/familyTree");
const Person = require("../models/Person");
const relationshipSetters = require("../utils/relationSetters");
const strings = require("../utils/strings");

let familyTree = new FamilyTree();

describe("Add Children", () => {
    it("should not add child through father", () => {
        let king = familyTree.getPerson("King Shan");
        let testChild = new Person("Ish", strings.maleString);
        let success = relationshipSetters.addChild(king,testChild,familyTree);
        expect(success).to.equal(false);
    });
    it("should not add child for invalid person", () => {
        let queen = familyTree.getPerson("Queen");
        let testChild = new Person("Ish", strings.maleString);
        let success = relationshipSetters.addChild(queen,testChild,familyTree);
        expect(success).to.equal(false);
    });
    it("should add children through mother", () => {
        let queen = familyTree.getPerson("Queen Anga");
        let girlChild = new Person("Amba",strings.femaleString);
        let boyChild = new Person("Ish",strings.maleString);
        let addedGirl = relationshipSetters.addChild(queen,girlChild,familyTree);
        let addedBoy = relationshipSetters.addChild(queen,boyChild,familyTree);
        expect(addedBoy && addedGirl).to.equal(true);
    });
});

describe("Add Partner", () => {
    it("should not add partner for married person", () => {
        let king = familyTree.getPerson("King Shan");
        let testPartner = new Person("Queen Ang", strings.femaleString);
        let success = relationshipSetters.addPartner(king,testPartner,familyTree);
        expect(success).to.equal(false);
    });
    it("should not add partner for invalid person", () => {
        let king = familyTree.getPerson("King");
        let testPartner = new Person("Queen Anga", strings.femaleString);
        let success = relationshipSetters.addPartner(king,testPartner.familyTree);
        expect(success).to.equal(false);
    });
    it("should add partner for an existing person", () => {
        let maleChild = familyTree.getPerson("Ish");
        let femaleChild = familyTree.getPerson("Amba");
        let malePartner = new Person("Chit", strings.maleString);
        let femalePartner = new Person("Lika", strings.femaleString);
        let addedMalePartner = relationshipSetters.addPartner(maleChild,femalePartner,familyTree);
        let addedFemalePartner = relationshipSetters.addPartner(femaleChild,malePartner,familyTree);
        expect(addedMalePartner && addedFemalePartner).to.equal(true);
    });
});