import { 
	generateMapping,
	generateAndPushQuestions
} from './QuestionGenerator';

export const formatSyntaxTree = (syntaxTreeArray, sentences) => {
	const prefixes = [];
	let count = 0;
	syntaxTreeArray.forEach((syntax) => {
		prefixes.push(
			generateMapping(sentences[count], syntax)
		);
		count++;
	});
	return prefixes;
};

export const formatBulkQuestions = (syntaxTreeArray, sentences) => {
	const questions = [];
	let count = 0;
	syntaxTreeArray.forEach((syntax) => {
		questions.push(
			generateAndPushQuestions(sentences[count], syntax)
		);
		count++;
	});
	return questions;
};
