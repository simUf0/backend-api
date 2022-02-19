"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.console = void 0;
require("colorts/lib/string");
class Console {
    log(message) {
        globalThis.console.log(message);
    }
    error(err) {
        this.log(`${err.name}: ${err.message}`.red);
        if (err.stack) {
            const stack = err.stack.split('\n').slice(1).join('\n');
            this.log(stack.grey);
        }
    }
}
exports.console = new Console();
exports.default = exports.console;
//# sourceMappingURL=console.js.map