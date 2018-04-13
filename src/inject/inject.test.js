const inject = require('./inject');

chrome = {
    extension: {
        sendMessage: jest.fn()
    }
};

describe('Find code blocks in wiki dome', () => {
    it('Should find wiki code block', () => {
        document.body.innerHTML = `<div class="codehilite language-mermaid"><pre><span></span>Test
                                    </pre></div>`;

        const codes = inject.findMermaidCodeInWikiPage();

        expect(codes.length).toEqual(1);

        expect(codes[0]).not.toEqual(undefined);
    });
});