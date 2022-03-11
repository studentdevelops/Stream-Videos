
async function queryHasuraGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        `${process.env.HASURA_ADMIN_URL}`,
        {
            headers: {
                "content-type": "application/json",
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
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

const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuerer
        publicAddress
      }
    }
  `;

function fetchMyQuery() {
    return queryHasuraGraphQL(
        operationsDoc,
        "MyQuery",
        {}
    );
}

export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}

startFetchMyQuery();