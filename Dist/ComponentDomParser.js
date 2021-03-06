/* ComponentDomParser 0.0.1 | @license ISC */

(function (global, factory) {
    "use strict";

    // If the env is browserify, export the factory using the module object.
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);

        // If the env is AMD, register the Module as 'ComponentDomParser'.
    } else if (global.define && typeof global.define === "function" && global.define.amd) {
        global.define("ComponentDomParser", [], function () {
            return factory(global);
        });

        // If the env is a browser(without CJS or AMD support), export the factory into the global window object.
    } else {
        global.ComponentDomParser = factory(global);
    }
})(window, function (global) {
    "use strict";

    var doc = global.document;

    /*
     * ComponentDomParser
     * @param options {Object} The options Object which initializes the parser.
     * @example
     * // Initialize a new instance of the ComponentDomParser.
     * var parser = new window.ComponentDomParser({
     *     dataSelector: 'app',
     *     componentIndex: {
     *         'myApplication': function(el) { el.innerHTML = 'myApplication initialized!' }
     *     },
     *     componentDidMountCallback: function(instance) {
     *         console.log(instance);
     *     }
     * });
     *
     * // Parse the document for all [data-app] nodes.
     * parser.parse();
     * @constructor
     */
    var ComponentDomParser = function (options) {
        this._checkForRequiredConstants(options);

        this.contextElement = options.contextElement || doc.body;
        this.dataSelector = options.dataSelector;
        this.componentIndex = options.componentIndex;
        this.componentDidMountCallback = options.componentDidMountCallback;
    };

    ComponentDomParser.prototype._checkForRequiredConstants = function (options) {
        if (!options) {
            throw new Error("ComponentDomParser Error: No option object was specified.");
        }

        if (!options.dataSelector) {
            throw new Error("ComponentDomParser Error: No dataSelector was specified.");
        }

        if (!options.componentIndex) {
            throw new Error("ComponentDomParser Error: No componentIndex was specified.");
        }

        if (options.componentDidMountCallback && typeof options.componentDidMountCallback !== "function") {
            throw new Error("ComponentDomParser Error: The componentDidMountCallback option must be a function.");
        }
    };

    ComponentDomParser.prototype.parse = function () {
        var elementNodeList = this.contextElement.querySelectorAll("[data-" + this.dataSelector + "]");
        var elementNodes = Array.prototype.slice.call(elementNodeList, 0);
        var self = this;

        elementNodes.forEach(function (node) {
            var componentKey = node.dataset[self.dataSelector];
            var Component = self.componentIndex[componentKey];

            if (Component) {
                self._mountComponent(node, Component);
            } else {
                console.info("ComponentDomParser Info: Component \"" + componentKey + "\" is not present in the passed componentIndex:", self.componentIndex);
            }
        });

        return this;
    };

    ComponentDomParser.prototype._mountComponent = function (node, Component) {
        var instance = new Component(node);

        if (this.componentDidMountCallback) {
            this.componentDidMountCallback(instance);
        }

        return instance;
    };


    return ComponentDomParser;
});
