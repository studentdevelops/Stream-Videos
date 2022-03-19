import { decodeToken } from "../lib/webTokens";

export async function UseRedirectUser(req) {
    const cookie = req ? req.cookies?.token : null;
    const token = await decodeToken(cookie);
    return {
        token : cookie,
        userId: token?.issuer
    };
};
