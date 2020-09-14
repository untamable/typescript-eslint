"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLinter = void 0;
const tslint_1 = require("tslint");
// We need to access the program, but Linter has private program already
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TSLintLinter = tslint_1.Linter;
class CustomLinter extends TSLintLinter {
    constructor(options, program) {
        super(options, program);
        this.program = program;
    }
    getResult() {
        return super.getResult();
    }
    getSourceFile(fileName) {
        return this.program.getSourceFile(fileName);
    }
}
exports.CustomLinter = CustomLinter;
//# sourceMappingURL=custom-linter.js.map