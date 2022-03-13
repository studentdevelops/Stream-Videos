
export async function queryHasuraGQL(operationsDoc, operationName, variables) {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDc1Nzc1MjQsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VycyIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXJzIiwiWC1IYXN1cmEtVXNlci1JZCI6IjEyMzQ1Njc4OTAifX0.YUHf8h5aKv--Z-Mqk-gDfRMm-96D1Mcx9kic6uTygBw"
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`,
        {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwt}`,
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
            },
            method: "POST",
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}
