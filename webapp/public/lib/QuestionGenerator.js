// Returns index of first noun phrase of treeArray
function getSlicingIndex(treeArray) {
    var index = 0
    for (var i = 0; i < treeArray.length; i++) {
        var data = treeArray[i];
        data = data.slice(1, data.length - 1);
        var typeAndWord = data.split(" ");
        var type = typeAndWord[0];
        if (type.slice(0, 1) === "V") {
            index++;
        } else {
            break;
        }
    }
    return index;
}

// Turns original tree into readable array
function generateTreeArray(tree) {
    var pattern = /\([A-Z]* *[A-z]*\)/g;
    var treeArray = tree.match(pattern);
    return treeArray;
}

// Returns starting and ending vertices [x, y) of verb phrase
// Raw is array of raw words in sentence
// Tree is a string of the analyzed tree struction of the sentence
function getStartEndIndicesVerbPhrase(treeArray) {
    var startingVerbIndex = -1;
    var endingVerbIndex = -1;
    for (var i = 0; i < treeArray.length; i++) {
        var data = treeArray[i];
        data = data.slice(1, data.length - 1);
        var typeAndWord = data.split(" ");
        var type = typeAndWord[0];
        if (startingVerbIndex ===  -1) {
            if (type.slice(0, 1) === "V") {
                startingVerbIndex = i;
            }
        } else {
            if (type.slice(0, 1) != "V") {
                endingVerbIndex = i;
                break;
            }
        }
    }
    return [startingVerbIndex, endingVerbIndex];
}

// Returns String of noun phrase of raw sentece
function getNounPhrase(raw, stopIndex) {
    if (stopIndex == 0) {
        return null;
    }
    return raw.slice(0, stopIndex).join(" ");
}

// Returns String of verb phrase of raw sentence
function getVerbPhrase(raw, startIndex, stopIndex) {
    return raw.slice(startIndex, stopIndex).join(" ");
}

// Returns String of object phrase of raw sentence
function getObjectPhrase(raw, startIndex) {
    return raw.slice(startIndex).join(" ");
}

// Returns [x, y, z] where x is subject, y is verb, z is object phrase
// Note is the input sentence
// Tree is the result from Microsoft API
export function generateMapping(note, tree) {
    var noteArray = note.split(" ");
    var treeArray = generateTreeArray(tree);
    var sliceIndex = getSlicingIndex(treeArray);
    noteArray = noteArray.slice(sliceIndex);
    treeArray = treeArray.slice(sliceIndex);
    var startEnd = getStartEndIndicesVerbPhrase(treeArray);
    var start = startEnd[0];
    var end = startEnd[1];
    var mapping = [getNounPhrase(noteArray, start), getVerbPhrase(noteArray, start, end), getObjectPhrase(noteArray, end)];
    return mapping;
}


// Generates and pushes questions to Firebase
function generateAndPushQuestions(note, tree) {
    var mapping = generateMapping(note, tree);
    var blank = "_____"
    for (var i = 0; i < mapping.length; i++) {
        var temp = mapping[i];
        mapping[i] = blank;
        var question = mapping.join(" ");
        var answer = temp.replace(/[.,;]/g, "").replace(/\s{2,}/g," ");
        mapping[i] = temp;
    }
}

var note = "John Adams drafted the Declaration of Independence.";
var tree = "(TOP (S (NP (NNP John) (NNP Adams)) (VP (VBD drafted) (NP (NP (DT the) (NNP Declaration)) (PP (IN of) (NP (NNP Independence))))) (. .)))";
generateAndPushQuestions(note, tree);
note = "drafted the declaration of independence is a document";
tree = "(VP (VBD drafted) (NP (NP (DT the) (NN declaration)) (PP (IN of) (NP (NN independence)))) (VP (VBZ is) (NP (DT a) (NN document))))";
generateAndPushQuestions(note, tree);
