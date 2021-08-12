"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevertError = void 0;
const ethers_1 = require("ethers");
const defaultRevertError = 'The call was reverted without providing further details.';
function getRevertError(error) {
    if (error === 'Reverted') {
        return defaultRevertError;
    }
    const encodedPrefix = 'Reverted 0x';
    if (error.startsWith(encodedPrefix)) {
        const bytes = `0x${error.substr(encodedPrefix.length)}`;
        try {
            const stringified = ethers_1.utils.toUtf8String('0x' + bytes.substr(138));
            return getRevertError(stringified);
        }
        catch (_a) { }
        return defaultRevertError;
    }
    return error;
}
exports.getRevertError = getRevertError;
