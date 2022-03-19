import { magicAdmin } from "../../lib/magic";
import { decodeToken, removeTokenCookie } from "../../lib/webTokens";



export default async function logout(req, res) {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({ message: "User is not logged in" });
        } else {
            const jwt = req.cookies.token;
            const token = await decodeToken(jwt)
            if (token.issuer) {
                removeTokenCookie(res);
                try {
                    await magicAdmin.users.logoutByIssuer(token.issuer)
                } catch (error) {
                    console.log({ error })
                }
                res.status(200).json({ msg: "User Logged out" })
            } else {
                res.status(404).json({})
            }

        }
        res.writeHead(302, { Location: "/login" });
        res.end();
    } catch (error) {
        res.status(401).json({ message: "User is not logged in" });
        console.log({ error })
    }

}