// import data from '../Data/DummyData.json'

export const getVideosCommon = async (URL) => {
    const BASE_URL = `youtube.googleapis.com/youtube/v3`
    const URLBuilder = `https://${BASE_URL}/${URL}&maxResults=25&key=${process.env.YOUTUBE_API}`;

    const response = await fetch(URLBuilder);
    const data = await response.json();
    console.log(data)
    try {
        return data.items.map((data) => {
            const id = data.id?.videoId || data.id;
            return {
                id: id,
                title: data.snippet.title,
                imgUrl: data.snippet.thumbnails.high.url,
                description: data.snippet.description,
                channelTitle: data.snippet.channelTitle,
                statistics: data.statistics ? data.statistics : { viewCount: 0 },
            }
        })
    }catch(error){
        console.log(error)
    }
}

export const getVideos = async (queryString) => {
    const URL = `search?part=snippet&q=${queryString}&type=video`;
    return getVideosCommon(URL);
}
//todo: add popular query string
export const getPopular = async () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`
    return getVideosCommon(URL)
}