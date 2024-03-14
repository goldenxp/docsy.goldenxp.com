hljs.registerLanguage('ink', function() {
	const CODE_OPERATORS = {
		scope: 'operator',
		match: /[-+*\/?!<=>%]/
	};
	const DECL_OPERATORS = {
		scope: 'operator',
		match: /[=\(\)]/
	};
	const KNOT = {
		className: 'section',
		begin: '===',
	};
	const KEYWORDS = {
		keyword: 'not return else temp',
		literal: 'true false',
		built_in: 'LIST_VALUE LIST_RANDOM READ_COUNT CHOICE_COUNT TURNS_SINCE TURNS RANDOM SEED_RANDOM'
	};
	var codeline = {
		scope: 'code',
		keywords: KEYWORDS,
		begin: '^~', 
		end: '$',
		contains: [ hljs.NUMBER_MODE, hljs.QUOTE_STRING_MODE, CODE_OPERATORS ]
	};
	var declarations = {
		scope: 'type',
		keywords: 'VAR CONST LIST',
		begin: '(VAR|CONST|LIST)',
		end: '$',
		contains: [ hljs.NUMBER_MODE, hljs.QUOTE_STRING_MODE, DECL_OPERATORS ]
	}
	return {
		case_insensitive: false,
		contains: [ 
			hljs.C_LINE_COMMENT_MODE, 
			hljs.C_BLOCK_COMMENT_MODE,
			hljs.HASH_COMMENT_MODE,
			codeline, declarations,
			KNOT
		]
	  };
});

hljs.highlightAll();
