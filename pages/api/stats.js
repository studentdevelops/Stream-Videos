import { findVideoIdByUserId, InsertIntoStats, UpdateStats } from "../../lib/db/hasura"
import { verifyToken as decodeToken } from "../../lib/webTokens"

const stats = async (req, res) => {
    if (req.method === "POST") {
        try {
            const token = req.cookies.token
            if (!token) {
                res.status(403).json({})
            } else {
                const decodedJWT = decodeToken(req.cookies.token)
                const doesVideoExists = await findVideoIdByUserId(req.body.VideoId, decodedJWT.issuer, token);
                if (doesVideoExists) {
                    const response = await UpdateStats({ UserId: decodedJWT.issuer, VideoId: req.body.VideoId, Favorite: req.body.Favorite, watched: true }, token);
                    res.json({ msg: true, cookies: req.cookies.token, response, "updated": true })
                } else {
                    const response = await InsertIntoStats({ UserId: decodedJWT.issuer, VideoId: req.body.VideoId, Favorite: 0, watched: true }, token);
                    res.json({ msg: true, cookies: req.cookies.token, response, "added": true })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Something Went Wrong" })
        }

    } else {
        res.status(418).json({})
    }
}

export default stats