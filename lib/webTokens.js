import jwt from "jsonwebtoken";
import cookie from "cookie";

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
        return token;
    } catch (error) {
        console.log({ error })
    }

}

const maxAge = 7 * 24 * 3600;

export const setTokenCookie = (token, res) => {
    const setCookie = cookie.serialize("token", token, {
        maxAge: maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });
    res.setHeader("Set-Cookie", setCookie);

}

export const removeTokenCookie = (res) => {
    const val = cookie.serialize("token", "", {
        maxAge: -1,
        path: "/"
    });

    res.setHeader("Set-Cookie", val);
};

export async function decodeToken(token) {
    if (token) {
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithm: "HS256" });
        return result;
    }
    return null;
}