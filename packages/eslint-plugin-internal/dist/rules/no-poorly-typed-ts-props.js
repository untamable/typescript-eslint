"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const util_1 = require("../util");
/*
TypeScript declares some bad types for certain properties.
See: https://github.com/microsoft/TypeScript/issues/24706

This rule simply warns against using them, as using them will likely introduce type safety holes.
*/
const BANNED_PROPERTIES = [
    // {
    //   type: 'Node',
    //   property: 'parent',
    //   fixWith: null,
    // },
    {
        type: 'Symbol',
        property: 'declarations',
        fixWith: 'getDeclarations()',
    },
    {
        type: 'Type',
        property: 'symbol',
        fixWith: 'getSymbol()',
    },
];
exports.default = util_1.createRule({
    name: 'no-poorly-typed-ts-props',
    meta: {
        type: 'problem',
        docs: {
            description: "Enforces rules don't use TS API properties with known bad type definitions",
            category: 'Possible Errors',
            recommended: 'error',
            suggestion: true,
            requiresTypeChecking: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
            doNotUse: 'Do not use {{type}}.{{property}} because it is poorly typed.',
            doNotUseWithFixer: 'Do not use {{type}}.{{property}} because it is poorly typed. Use {{type}}.{{fixWith}} instead.',
            suggestedFix: 'Use {{type}}.{{fixWith}} instead.',
        },
    },
    defaultOptions: [],
    create(context) {
        const { program, esTreeNodeToTSNodeMap } = experimental_utils_1.ESLintUtils.getParserServices(context);
        const checker = program.getTypeChecker();
        return {
            'MemberExpression[computed = false]'(node) {
                for (const banned of BANNED_PROPERTIES) {
                    if (node.property.name !== banned.property) {
                        continue;
                    }
                    // make sure the type name matches
                    const tsObjectNode = esTreeNodeToTSNodeMap.get(node.object);
                    const objectType = checker.getTypeAtLocation(tsObjectNode);
                    const objectSymbol = objectType.getSymbol();
                    if ((objectSymbol === null || objectSymbol === void 0 ? void 0 : objectSymbol.getName()) !== banned.type) {
                        continue;
                    }
                    const tsNode = esTreeNodeToTSNodeMap.get(node.property);
                    const symbol = checker.getSymbolAtLocation(tsNode);
                    const decls = symbol === null || symbol === void 0 ? void 0 : symbol.getDeclarations();
                    const isFromTs = decls === null || decls === void 0 ? void 0 : decls.some(decl => decl.getSourceFile().fileName.includes('/node_modules/typescript/'));
                    if (isFromTs !== true) {
                        continue;
                    }
                    return context.report({
                        node,
                        messageId: banned.fixWith ? 'doNotUseWithFixer' : 'doNotUse',
                        data: banned,
                        suggest: [
                            {
                                messageId: 'suggestedFix',
                                data: banned,
                                fix(fixer) {
                                    if (banned.fixWith == null) {
                                        return null;
                                    }
                                    return fixer.replaceText(node.property, banned.fixWith);
                                },
                            },
                        ],
                    });
                }
            },
        };
    },
});
//# sourceMappingURL=no-poorly-typed-ts-props.js.map