const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function(event) {
	let file = fileInput.files[0];
	let reader = new FileReader;

	reader.onload = function() {
		let code = reader.result;
		removeCodeComments(code);
	}

	reader.readAsText(file);
});

function removeCodeComments(code) {
    let inQuoteChar = null,
     	inBlockComment = false,
     	inLineComment = false,
     	inRegexLiteral = false;

    let newCode = ''; 	
   
    for (let i = 0; i < code.length; i++) {
        if (!inQuoteChar && !inBlockComment && !inLineComment && !inRegexLiteral) {
            if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
                inQuoteChar = code[i];
            }
            else if (code[i] === '/' && code[i+1] === '*') {
                inBlockComment = true;
            }
            else if (code[i] === '/' && code[i+1] === '/') {
                inLineComment = true;
            }
            else if (code[i] === '/' && code[i+1] !== '/') {
                inRegexLiteral = true;
            }
        }
        else {
            if (inQuoteChar && ((code[i] === inQuoteChar && code[i-1] != '\\') || (code[i] === '\n' && inQuoteChar !== '`'))) {
                inQuoteChar = null;
            }
            if (inRegexLiteral && ((code[i] === '/' && code[i-1] !== '\\') || code[i] === '\n')) {
                inRegexLiteral = false;
            }
            if (inBlockComment && code[i-1] === '/' && code[i-2] === '*') {
                inBlockComment = false;
            }
            if (inLineComment && code[i] === '\n') {
                inLineComment = false;
            }
        }
        if (!inBlockComment && !inLineComment && code[i]) {
            newCode = newCode + code[i];
        }
    }

    console.log(newCode);
    return newCode;
}