const FamilyTree = require("./models/familyTree");
const inputReader = require("./utils/inputReader");
const strings = require("./utils/strings");

const inputFile = process.argv[strings.inputFileArgumentIndex];

// Create the Family Tree
let familyTree = new FamilyTree();
familyTree.addDefaultMembers();

// Read the input file as a stream and process
inputReader.readAndProcess(inputFile, familyTree);