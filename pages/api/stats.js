import { findVideoIdByUserId, InsertIntoStats, UpdateStats } from "../../lib/db/hasura"
import { decodeToken } from "../../lib/webTokens"

const stats = async (req, res) => {

    const checkVideo = (videoStat) => {
        return videoStat?.length > 0;
    }

    const token = req.cookies.token

    if (!token) {
        res.status(403).json({})
    } else {
        try {
            const { issuer } = decodeToken(req.cookies.token)
            const { VideoId, Favorite , watched = true } = req.method === "POST" ? req.body : req.query;
            const videoStat = await findVideoIdByUserId(VideoId, issuer, token);
            if (req.method === "POST") {
                if (VideoId) {
                    if (checkVideo(videoStat)) {
                        const response = await UpdateStats({ UserId: issuer, VideoId, Favorite: Favorite, watched }, token);
                        res.json({ msg: true, cookies: req.cookies.token, response, "updated": true })
                    } else {
                        const response = await InsertIntoStats({ UserId: issuer, VideoId, watched }, token);
                        res.json({ msg: true, cookies: req.cookies.token, response, "added": true })
                    }
                } else {
                    res.status(400).json({})
                }
            } else if (req.method === "GET") {
                if (VideoId) {
                    if (checkVideo) {
                        res.status(200).json(videoStat);
                    } else {
                        res.status(404).json({ msg: "user not found" })
                    }
                } else {
                    res.status(400).json({})
                }

            } else {
                res.status(418).json({})

            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Something Went Wrong" })
        }

    }
}

export default stats