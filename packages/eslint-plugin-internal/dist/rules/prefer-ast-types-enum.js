"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const util_1 = require("../util");
const isStringLiteral = (node) => typeof node.value === 'string';
exports.default = util_1.createRule({
    name: __filename,
    meta: {
        type: 'problem',
        docs: {
            category: 'Best Practices',
            recommended: 'error',
            description: 'Ensures consistent usage of AST_NODE_TYPES & AST_TOKEN_TYPES enums.',
        },
        messages: {
            preferEnum: 'Prefer {{ enumName }}.{{ literal }} over raw literal',
        },
        fixable: 'code',
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        const report = (enumName, literal) => context.report({
            data: { enumName, literal: literal.value },
            messageId: 'preferEnum',
            node: literal,
            fix: fixer => fixer.replaceText(literal, `${enumName}.${literal.value}`),
        });
        return {
            Literal(node) {
                var _a, _b;
                if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === experimental_utils_1.AST_NODE_TYPES.TSEnumMember &&
                    ((_b = node.parent.parent) === null || _b === void 0 ? void 0 : _b.type) === experimental_utils_1.AST_NODE_TYPES.TSEnumDeclaration &&
                    ['AST_NODE_TYPES', 'AST_TOKEN_TYPES'].includes(node.parent.parent.id.name)) {
                    return;
                }
                if (!isStringLiteral(node)) {
                    return;
                }
                const value = node.value;
                if (Object.prototype.hasOwnProperty.call(experimental_utils_1.AST_NODE_TYPES, value)) {
                    report('AST_NODE_TYPES', node);
                }
                if (Object.prototype.hasOwnProperty.call(experimental_utils_1.AST_TOKEN_TYPES, value)) {
                    report('AST_TOKEN_TYPES', node);
                }
            },
        };
    },
});
//# sourceMappingURL=prefer-ast-types-enum.js.map