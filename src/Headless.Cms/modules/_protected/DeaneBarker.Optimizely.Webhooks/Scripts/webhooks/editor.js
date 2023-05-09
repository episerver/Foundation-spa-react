/*
This is specifically designed to do as little as possible and have no dependencies.
1. It's styled sort of like a code editor (?)
2. Spellchecking is turned off (no red squiggly lines -- I hate those!)
3. The TAB key will insert 2 spaces, instead of moving focus
4. When you press enter, it will add leading spaces to match the leading spaces on the prior line
...and that's all it does.
In your content model, add this attribute to your string property:
  [ClientEditor(ClientEditingClass = "/ClientResources/editors/code/editor.js")]
  public virtual string SomeCodeOrSomething { get; set; }
(Or, wherever you decide to put this.)
This has undergone virtually no testing. Assume it will melt your computer and destroy your life.
Deane Barker
deane@deanebarker.net
*/

define(
    [
        "dojo/_base/declare",
        "dijit/_Widget",
        "dijit/_TemplatedMixin"
    ],
    function (
        declare,
        _Widget,
        _TemplatedMixin
    ) {
        return declare([_Widget, _TemplatedMixin],
            {
                templateString: '<div class="dijitInline"><textarea ' +
                    'spellcheck="false" ' +
                    'style="width: 600px; height: 400px; font-size: 90%; font-family: consolas; padding: 1em; line-height: 140%; background-color: rgb(250,250,250); color: black;" ' +
                    'data-dojo-attach-point="code" ' +
                    'data-dojo-attach-event="onchange:_onChange,onkeypress:_onKeyPress,onkeyup:_onKeyUp"' +
                    '></textarea ></div>',

                _setValueAttr: function (value) {
                    this._set('value', value);
                    this.code.value = this.value || '';
                },

                _onChange: function (event) {
                    this._set('value', event.target.value);
                    this.onChange(this.value);
                },

                // Catches the tab key and replaces with two spaces
                _onKeyPress: function (event) {
                    var tabReplacement = '  ';
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 9) {
                        event.preventDefault();
                        var start = this.code.selectionStart;
                        var end = this.code.selectionEnd;
                        this.code.value = this.code.value.substring(0, start) + tabReplacement + this.code.value.substring(end);
                        this.code.selectionEnd = start + tabReplacement.length;
                    };
                },

                // When pressing enter, this matches the leading spaces on the prior line
                _onKeyUp: function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 13) {
                        var start = this.code.selectionStart;
                        var lines = this.code.value.substring(0, start).split(/\r?\n/);
                        if (lines.length == 1) { return; }
                        var lastLine = lines[lines.length - 2];
                        var leadingSpaces = lastLine.substring(0, lastLine.search(/\S|$/));
                        var end = this.code.selectionEnd; this.code.value = this.code.value.substring(0, start) + leadingSpaces + this.code.value.substring(end);
                        this.code.selectionEnd = start + leadingSpaces.length;
                    };
                }
            })
    }
);