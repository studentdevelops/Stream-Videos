

export default function login(req, res) {
    if (req.method === "POST") {
        try {
            res.status(200).json({ name: 'John Doe' })
        } catch (error) {
            res.status(500).json({ error })
        }
    } else {
        
    }
}
