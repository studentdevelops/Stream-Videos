
import { Magic } from '@magic-sdk/admin';
import jwt from "jsonwebtoken"

export const magicAdmin = new Magic(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY);

export const CreateJWT = (metaData) => {
    try {
        const tokenStyle = {
            "name": `${metaData.email}`,
            "iat": Math.floor(Date.now() / 1000),
            "exp": Math.floor(Date.now() / 1000 + 7 * 24 * 3600),
            "issuer": `${metaData.issuer}`,
            "publicAddress": `${metaData.publicAddress}`,
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": "1234567890",
            }
        }
        const wt = jwt.sign({ tokenStyle }, process.env.JWT_SECRET_KEY);
        return wt;
    } catch (error) {
        console.log(error)
    }

}

