import { generateMapping } from './QuestionGenerator';

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
