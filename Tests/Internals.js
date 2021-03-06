describe('ComponentDomParser: Internals', function() {
    var testElement;

    beforeEach(function() {
        testElement = document.createElement('div');
        testElement.setAttribute('data-app', 'Example');
        document.body.appendChild(testElement);
    });

    it('should throw an error if no options were defined', function() {
        expect(function() {
            var moduleParserInstance = new window.ComponentDomParser();
        }).toThrow(new Error('ComponentDomParser Error: No option object was specified.'));
    });

    it('should throw an error if no dataSelector was specified', function() {
        expect(function() {
            var moduleParserInstance = new window.ComponentDomParser({
                componentIndex: {}
            });
        }).toThrow(new Error('ComponentDomParser Error: No dataSelector was specified.'));
    });

    it('should throw an error if no componentIndex was specified', function() {
        expect(function() {
            var moduleParserInstance = new window.ComponentDomParser({
                dataSelector: 'app'
            });
        }).toThrow(new Error('ComponentDomParser Error: No componentIndex was specified.'));
    });

    it('should throw an error if the "componentDidMountCallback" value is not a function', function() {
        expect(function() {
            var moduleParserInstance = new window.ComponentDomParser({
                dataSelector: 'app',
                componentIndex: {},
                componentDidMountCallback: 'Not a function'
            });
        }).toThrow(new Error('ComponentDomParser Error: The componentDidMountCallback option must be a function.'));
    });

    it('should not throw any errors if the requested Constructor is not in the "componentIndex"', function() {
        var moduleParserInstance = new window.ComponentDomParser({
            dataSelector: 'app',
            componentIndex: {}
        });

        expect(function() {
            moduleParserInstance.parse();
        }).not.toThrow(new Error());
    });

    afterEach(function() {
        document.body.removeChild(testElement);
    });
});
