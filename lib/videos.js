import data from '../Data/DummyData.json'

export const getVideos = () => {
    return data.items.map((data) => {
        return {
            id: data.id.videoId,
            title: data.snippet.title,
            imgUrl: data.snippet.thumbnails.high.url,
        }
    })
}