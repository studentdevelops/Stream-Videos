

async function fetchGraphQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(
        "undefined",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}

const operationsDoc = `
    query MyQuery {
      users(where: {issuerer: {_eq: "x-hasura-user-id"}}) {
        email
        id
        issuerer
        publicAddress
      }
    }
  `;

function fetchMyQuery() {
    return fetchGraphQL(
        operationsDoc,
        "MyQuery",
        {},
        token
    );
}

async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}

startFetchMyQuery();

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
        console.log({ token })
        return token;
    } catch (error) {
        console.log(error)
    }

}