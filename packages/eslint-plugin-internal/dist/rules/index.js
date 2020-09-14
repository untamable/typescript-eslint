"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const no_poorly_typed_ts_props_1 = __importDefault(require("./no-poorly-typed-ts-props"));
const no_typescript_default_import_1 = __importDefault(require("./no-typescript-default-import"));
const no_typescript_estree_import_1 = __importDefault(require("./no-typescript-estree-import"));
const plugin_test_formatting_1 = __importDefault(require("./plugin-test-formatting"));
const prefer_ast_types_enum_1 = __importDefault(require("./prefer-ast-types-enum"));
exports.default = {
    'no-poorly-typed-ts-props': no_poorly_typed_ts_props_1.default,
    'no-typescript-default-import': no_typescript_default_import_1.default,
    'no-typescript-estree-import': no_typescript_estree_import_1.default,
    'plugin-test-formatting': plugin_test_formatting_1.default,
    'prefer-ast-types-enum': prefer_ast_types_enum_1.default,
};
//# sourceMappingURL=index.js.map