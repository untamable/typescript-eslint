"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const util_1 = require("../util");
/*
We have `allowSyntheticDefaultImports` turned on in this project, so there are two problems that arise:
- TypeScript's auto import will suggest `import ts = require('typescript');` if you type `ts`
- VSCode's suggestion feature will suggest changing `import * as ts from 'typescript'` to `import ts from 'typescript'`

In order to keep compatibility with a wide range of consumers, some of whom don't use `allowSyntheticDefaultImports`, we should
always use either:
- `import * as ts from 'typescript';`
- `import { SyntaxKind } from 'typescript';`
*/
exports.default = util_1.createRule({
    name: 'no-typescript-default-import',
    meta: {
        type: 'problem',
        docs: {
            description: "Enforces that packages rules don't do `import ts from 'typescript';`",
            category: 'Possible Errors',
            recommended: 'error',
        },
        fixable: 'code',
        schema: [],
        messages: {
            noTSDefaultImport: [
                "Do not use the default import for typescript. Doing so will cause the package's type definitions to do the same.",
                "This causes errors for consumers if they don't use the allowSyntheticDefaultImports compiler option.",
            ].join('\n'),
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            'ImportDeclaration > ImportDefaultSpecifier'(node) {
                const importStatement = node.parent;
                if (importStatement.source.value === 'typescript') {
                    context.report({
                        node,
                        messageId: 'noTSDefaultImport',
                        fix(fixer) {
                            if (importStatement.specifiers.length === 1) {
                                return fixer.replaceText(node, '* as ts');
                            }
                            return null;
                        },
                    });
                }
            },
            'TSImportEqualsDeclaration > TSExternalModuleReference'(node) {
                const parent = node.parent;
                if (node.expression.type === experimental_utils_1.AST_NODE_TYPES.Literal &&
                    node.expression.value === 'typescript') {
                    context.report({
                        node,
                        messageId: 'noTSDefaultImport',
                        fix(fixer) {
                            return fixer.replaceText(parent, "import * as ts from 'typescript';");
                        },
                    });
                }
            },
        };
    },
});
//# sourceMappingURL=no-typescript-default-import.js.map