export const JWT_SECRET = (() => { if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET environment variable is required'); return process.env.JWT_SECRET; })();
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';
