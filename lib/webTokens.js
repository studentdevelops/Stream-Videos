import jwt from "jsonwebtoken";

const tokenFormat = (metaData) => {
    return {
        "iat": Math.floor(Date.now() / 1000),
        "exp": Math.floor(Date.now() / 1000 + 7 * 24 * 3600),
        "publicAddress": `${metaData.publicAddress}`,
        "issuer": `${metaData.issuer}`,
        "email": `${metaData.email}`,
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["users", "admin"],
            "x-hasura-default-role": "users",
            "x-hasura-user-id": `${metaData.issuer}`
        }
    }
}

export const CreateJWT = (metaData) => {
    try {
        const token = jwt.sign(tokenFormat(metaData), process.env.JWT_SECRET_KEY, { algorithm: 'HS256' });
        // console.log({ token })
        return token;
    } catch (error) {
        console.log(error)
    }

}