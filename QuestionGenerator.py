import http.client
import json

def push_to_database(userId, classId, data):
    question, answer = data[0], data[1]
    conn = http.client.HTTPSConnection("nodepad-ecd25.firebaseio.com/.json")
    headers = {"Content-type": "application/json"}
    payload = dict()
    payload["userId"] = userId
    payload["classId"] = classId
    qa = dict()
    qa["Question"] = question
    qa["Answer"] = answer
    payload["QA"] = qa
    json_payload = json.dumps(payload)
    #with open("test.json") as test:
    conn.request("POST", "/markdown", json_payload, headers)
    response = conn.getresponse()
    print(response.read().decode())
    conn.close()

# Returns True if tag is a proper noun else False
def is_proper_noun(tag):
    return tag == "NNP" or tag == "NNPS"

# Returns a tuple (x, y) where x is the subject phrase and y is "Proper" if x is a proper noun else
# y is "Common"
def get_subject(tree):
    subject_type = "Common"
    first_noun_phrase_index = tree.find("NP")
    index = first_noun_phrase_index + 3
    char_array = list(tree)
    num_left_paren = 0
    num_right_paren = 0
    char_buffer = []
    subject = []
    while num_left_paren >= num_right_paren:
        if char_array[index] == "(":
            num_left_paren += 1
        elif char_array[index] == ")":
            num_right_paren += 1
            space_index = 0
            space_index = len(char_buffer)
            for i in reversed(range(len(char_buffer))):
                if char_buffer[i] == " ":
                    space_index = i
                    break
            word = "".join(char_buffer[space_index + 1:])
            if word:
                subject.append(word)
            word_type = "".join(char_buffer[:space_index + 1])
            if is_proper_noun(word_type.strip()):
                subject_type = "Proper"
            char_buffer = []
        else:
            char_buffer.append(char_array[index])
        index += 1
    return (" ".join(subject), subject_type)

def get_verb_phrase(tree):
    verb_phrase_index = tree.find("VP")
    index = verb_phrase_index + 3
    char_array = list(tree)
    num_left_paren = 0
    num_right_paren = 0
    char_buffer = []
    verb_phrase = []
    while num_left_paren >= num_right_paren:
        if char_array[index] == "(":
            num_left_paren += 1
        elif char_array[index] == ")":
            num_right_paren += 1
            space_index = len(char_buffer)
            for i in reversed(range(len(char_buffer))):
                if char_buffer[i] == " ":
                    space_index = i
                    break
            word = "".join(char_buffer[space_index + 1:])
            if word:
                verb_phrase.append(word)
            char_buffer = []
        else:
            char_buffer.append(char_array[index])
        index += 1
    return " ".join(verb_phrase)

#Attempts to generate a question starting with "When" using the raw text
def get_when_question_answer(note):
    during_index = note.find("during")
    before_index = note.find("before")
    after_index = note.find("after")
    in_index = note.find("in")
    on_index = note.find("on")

# Generates one question and answer based on one sentence.
# Raw is an array of the original sentence of the notes.
# Analyzed is an array of the part of speech corresponding to the word in raw.
def generate_question_answer(tree):
    question, answer = None, None
    #Subject type is "Proper" if subject has proper noun else "Common"
    subject, subject_type = get_subject(tree)
    verb_phrase = get_verb_phrase(tree)
    # Detect "Who" question
    if subject_type == "Proper":
        question = "Who " + verb_phrase + "?"
        answer = subject
        return (question, answer)
    elif subject_type == "Common":
        question = "What " + verb_phrase + "?"
        answer = subject
    return (question, answer)
    
note = "John Adams drafted the Declaration of Independence"
tree = "(TOP (S (NP (NNP John) (NNP Adams)) (VP (VBD wrote) (NP (NP (DT the) (NNP Declaration)) (PP (IN of) (NP (NNP Independence)))))))"
print(note)
print(generate_question_answer(tree))
note = "The mitochondria is the powerhouse of the cell"
tree = "(TOP (S (NP (DT The) (NN mitochrondria)) (VP (VBZ is) (NP (NP (DT the) (NN powerhouse)) (PP (IN of) (NP (DT the) (NN cell)))))))"
print(note)
print(generate_question_answer(tree))
note = "Declaration of Independence was drafted by John Adams"
tree = "(TOP (S (NP (NP (NNP Declaration)) (PP (IN of) (NP (NNP Independence)))) (VP (VBD was) (VP (VBN drafted) (PP (IN by) (NP (NNP John) (NNP Adams)))))))"
print(note)
print(generate_question_answer(tree))
push_to_database(1, 1, generate_question_answer(tree))
