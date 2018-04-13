chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		const bitbucketCodes = findMermaidCodeInWikiPageBitbucket();
		transformCodes(bitbucketCodes);
		
		const githubCodes = findMermaidCodeInWikiPageGithub();
		transformCodes(githubCodes);

		try {
			mermaid.init(undefined, '.mermaid');
		} catch (e) {
			alert('Mermaid parse error: \n' + JSON.stringify(e));
		}
	}
	}, 10);
});

function transformCodes(codes) {
	Array.prototype.forEach.call(codes, function(code) {
        code.className += ' mermaid';
        const text = code.innerText.replace('#!mermaid', '').trim();

        code.textContent = text;
    });
}

function findMermaidCodeInWikiPageBitbucket() {
	return document.querySelectorAll('div .language-mermaid');
}

function findMermaidCodeInWikiPageGithub() {
	return Array.prototype.filter.call(document.querySelectorAll('code'), function (code) {
		const text = code.innerText;

		return text.indexOf('#!mermaid') === 0;
	});
}