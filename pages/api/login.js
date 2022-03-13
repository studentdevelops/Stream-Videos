
import { CreateJWT, magicAdmin } from "../../lib/magic";

export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const { token } = req.body;
            const meta = await magicAdmin.users.getMetadataByToken(token);
            const jwt = CreateJWT(meta);
            res.status(200).json( jwt )
            // const response = fetch('/api/login', {
            //     method: 'POST', // or 'PUT'
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({token}),
            //   })
        } catch (error) {
            res.status(500).json({ error })
        }
    } else {

    }
}