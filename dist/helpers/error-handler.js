"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.error(err);
    return res.status(400).json({
        error: err.name
    });
}
exports.errorHandler = errorHandler;
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map