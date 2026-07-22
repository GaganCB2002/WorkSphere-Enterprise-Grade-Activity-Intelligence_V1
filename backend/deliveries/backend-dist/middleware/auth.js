"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authentication required.' });
        return;
    }
    try {
        const token = header.replace('Bearer ', '');
        req.auth = auth_service_1.authService.verify(token);
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.auth?.role?.toLowerCase();
        const isAllowed = roles.some(r => r.toLowerCase() === userRole);
        if (!req.auth || !isAllowed) {
            res.status(403).json({ message: 'You do not have permission to access this resource.' });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
