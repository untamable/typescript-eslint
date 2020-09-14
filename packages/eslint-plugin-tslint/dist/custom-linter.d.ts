import { ILinterOptions, LintResult } from 'tslint';
import { Program, SourceFile } from 'typescript';
declare const TSLintLinter: any;
export declare class CustomLinter extends TSLintLinter {
    private readonly program;
    constructor(options: ILinterOptions, program: Program);
    getResult(): LintResult;
    getSourceFile(fileName: string): SourceFile | undefined;
}
export {};
//# sourceMappingURL=custom-linter.d.ts.map