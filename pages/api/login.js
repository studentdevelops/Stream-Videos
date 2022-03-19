
import { CreateNewUser, isNewUser } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/magic";
import { CreateJWT, setTokenCookie } from "../../lib/webTokens";

export default async function loginApi(req, res) {
    if (req.method === "POST") {
        try {
            const token = req.headers?.authorization?.substr(7);
            const metaData = await magicAdmin.users.getMetadataByToken(token);
            const jwt = CreateJWT(metaData);
            const response = await isNewUser(jwt, metaData.issuer)

            response && await CreateNewUser(metaData, jwt)
            setTokenCookie(jwt, res);
            res.json({ msg: true })

        } catch (error) {
            console.log({error})
            res.status(500).json({ msg: false })
        }
    } else {
        res.status(405).json({ method: "invalid" });
    }
}