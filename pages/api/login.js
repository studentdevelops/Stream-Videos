
import { CreateJWT } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/magic";

export default async function loginApi(req, res) {
    if (req.method === "POST") {
        try {
            const token = req.headers?.authorization?.substr(7) || " ";
            // console.log(token)
            const metaData = await magicAdmin.users.getMetadataByToken("WyIweDM1ZGM2ZDNhZjJkYWQ0YzY5MzY0MjJjMmUzYmVjNmMxNWY4NjNjNDc5MzAwNThiZmI4YTE1NGM5OThjZDEyNGUyMDIzYmY0ODE0MDc1YWY5YjQxMjY3NDJlMjA4MDBmNDQ4M2NkMTU1YmM4MGUyNmFmMTM5YzRiZjRjMzQ0NDI0MWIiLCJ7XCJpYXRcIjoxNjQ3MTgxOTU5LFwiZXh0XCI6MTY0NzE4Mjg1OSxcImlzc1wiOlwiZGlkOmV0aHI6MHg0Nzk4YTE0Njg1MjNCM0VmRDYyYjNlNWQ4MWIxY2FlOGIyYTZFNTM4XCIsXCJzdWJcIjpcInd4VW4tUUdTZWxoSzBoaGxaVEFvY0g1Y1BEVzhiZ0d0eEJSQ2JBcXZIMXM9XCIsXCJhdWRcIjpcInZyanJ4YTZGRUl3aERKc1FobF9UaHFPSURBNk1RYmIzem1oS1IzMkhiNlU9XCIsXCJuYmZcIjoxNjQ3MTgxOTU5LFwidGlkXCI6XCIxMGY5NDUyNi1lNzIyLTRhYWUtOTVmOS0zNWQzMjZkZmJlZjlcIixcImFkZFwiOlwiMHhmNTJiNzJiYWUyNGVmYjgyNjEzMDkxODg2NDNmYWUwZTZhNWUyYTM3NjRlMzQxYzg2Y2M4NmZmNTQ3MzhjOWIyN2QzYjQ1NTI5NzNkOTJlODg1MjhiYmJlNzFkYTY5ODA2NzA1NzEzOWVhNDgxMTQ5OTVmMDBkMTE2OTAxMjg1ZDFjXCJ9Il0=");
            // console.log(metaData)
            const jwt = CreateJWT(metaData);
            res.status(200).json({ worked: true })
            // const response = fetch('/api/login', {
            //     method: 'POST', // or 'PUT'
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({token}),
            //   })
        } catch (error) {
            res.status(500).json({ worked: false })
        }
    } else {

    }
}