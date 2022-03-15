

export async function isNewUser(token, issuer) {
    const operationsDoc = `
    query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
        publicAddress
        }
    }
`;
    const response = await QueryHasuraGQL(operationsDoc, "isNewUser", { issuer }, token || "")
    return response?.data?.users?.length === 0;
}

async function QueryHasuraGQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
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



export const CreateNewUser = async (metaData, token) => {
    const { email, issuer, publicAddress } = metaData;
    const operationsDoc = `
        mutation CreateNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
            insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) { 
                returning {
                    email
                    id
                    issuer
                }
             }
        }
    `;
    const response = await QueryHasuraGQL(operationsDoc, "CreateNewUser", { email, issuer, publicAddress }, token || "")
    return response;
}
