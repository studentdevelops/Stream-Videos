import TestData from '../Data/DummyData.json'
import { getWatchedVideos } from './db/hasura';

const fetchVideos = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

export const getVideosCommon = async (URL) => {
    const BASE_URL = `youtube.googleapis.com/youtube/v3`
    const URLBuilder = `https://${BASE_URL}/${URL}&key=${process.env.YOUTUBE_API}&maxResults=25`;
    const dev = process.env.production

    const data = dev ? TestData : await fetchVideos(URLBuilder)
    // console.log(data)
    try {
        return data.items.map((data) => {
            const id = data.id?.videoId || data.id;
            return {
                id: id,
                title: data.snippet.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                description: data.snippet.description,
                channelTitle: data.snippet.channelTitle,
                statistics: data.statistics ? data.statistics : { viewCount: 0 },
            }
        })
    } catch (error) {
        console.log({ error })
    }
}

export const getVideos = async (queryString) => {
    const URL = `search?part=snippet&q=${queryString}&type=video`;
    return getVideosCommon(URL);
}

export const getPopular = async () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&q=Movie%2trailer&chart=mostPopular&regionCode=US`
    return getVideosCommon(URL)
}

export const getYoutubeVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

    return getVideosCommon(URL);
};

export const getWatchItAgain = async (userId, token) => {
    const videos = await getWatchedVideos(userId, token);
    return videos?.map((video) => {
        return { 
            id: video.VideoId, 
            imgUrl: `https://i.ytimg.com/vi/${video.VideoId}/maxresdefault.jpg`
        }
    });
}



