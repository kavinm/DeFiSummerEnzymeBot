"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = void 0;
const loadEnv = (env) => {
    const v = process.env[env];
    if (!v) {
        throw new Error(`${env} not set`);
    }
    return v;
};
exports.loadEnv = loadEnv;
