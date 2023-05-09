"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guid {
    static isEmpty(value) {
        if (!value)
            return true;
        if (value === Guid.Empty)
            return true;
        return false;
    }
}
Guid.Empty = '00000000-0000-0000-0000-000000000000';
exports.default = Guid;
//# sourceMappingURL=guid.js.map