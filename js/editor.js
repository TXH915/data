class CodeEditor {
    constructor(elementId) {
        this.editor = CodeMirror.fromTextArea(document.getElementById(elementId), {
            mode: 'python',
            theme: 'material-darker',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            autoCloseBrackets: true,
            matchBrackets: true,
            lineWrapping: false,
            extraKeys: {
                'Ctrl-Enter': () => this.runCode(),
                'Shift-Enter': () => this.runCode()
            }
        });
        this.editor.setSize(null, '100%');
    }

    getValue() {
        return this.editor.getValue();
    }

    setValue(value) {
        this.editor.setValue(value);
    }

    focus() {
        this.editor.focus();
    }
}

let codeEditor;

document.addEventListener('DOMContentLoaded', () => {
    codeEditor = new CodeEditor('codeEditor');
});
