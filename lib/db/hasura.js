

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
    const response = await QueryHasuraGQL(operationsDoc, "isNewUser", { issuer }, token)
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
    const response = await QueryHasuraGQL(operationsDoc, "CreateNewUser", { email, issuer, publicAddress }, token)
    return response;
}


export const findVideoIdByUserId = async (VideoId, UserId, token) => {
    const operationsDoc = `
    query FindVideoIdByUserId($VideoId: String!, $UserId: String!) {
      stats(where: {VideoId: {_eq: $VideoId}, UserId: {_eq: $UserId}}) {
        Favorited
        UserId
        VideoId
        id
        watched
      }
    }
  `;
    const response = await QueryHasuraGQL(operationsDoc, "FindVideoIdByUserId", { VideoId, UserId }, token)
    return response?.data?.stats;
}

// to insert
export const InsertIntoStats = async ({ UserId, VideoId, Favorite, watched }, token) => {
    const operationsDoc = `
  mutation InsertStats($UserId: String!, $VideoId: String!, $watched: Boolean!) {
    insert_stats(objects: { UserId: $UserId, VideoId: $VideoId, watched: $watched}) {
      returning {
        Favorited
        UserId
        VideoId
        id
        watched
      }
    }
  }
`;
    const response = await QueryHasuraGQL(operationsDoc, "InsertStats", { VideoId, UserId, watched }, token);
    return response?.data?.insert_stats?.returning[0];
}

export const UpdateStats = async ({ UserId, VideoId, Favorite, watched }, token) => {
    const operationsDoc = `
      mutation UpdatingStats($UserId : String!, $VideoId : String!, $Favorite: Int!, $watched: Boolean!) {
        update_stats(where: {UserId: {_eq: $UserId}, VideoId: {_eq: $VideoId}}, _set: {Favorited: $Favorite, watched: $watched}) {
          affected_rows
        }
      }
    `;
    const response = await QueryHasuraGQL(operationsDoc, "UpdatingStats", { VideoId, UserId, Favorite, watched }, token)
    return response?.data?.update_stats?.affected_rows;
}