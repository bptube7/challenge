import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { setDataToCache, getDataFromCache } from 'utility/storage';
import { LoadingContext } from 'providers';

const RSS2JSON_API_KEY = 'gppkxgwc9vfrvhrauebluh6nhf9f93w4j8nn7d7n';

const usePodcast = ({ podcastId }) => {
  const [details, setDetails] = useState(null);
  const [url, setUrl] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  // ACCESS THE LOADING CONTEXT VALUE
  const { initLoading, finishLoading } = useContext(LoadingContext);

  //FETCH PODCAST
  const fetchPodcastUrl = () => {
    //FETCH WITH allorigins API TO DEAL WITH CORS
    const fetchUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}`)}`;
    axios
      .get(fetchUrl)
      .then((res) => {
        const data = res.data;
        if(data && data.contents) {
          const dataDecoded = JSON.parse(data.contents);
          const dataToAdd = {
            url: dataDecoded.results[0].feedUrl,
            totalEpisodes: dataDecoded.results[0].trackCount,
          }
          setDataToCache({key: 'PODCAST_URL', id: podcastId, data: dataToAdd});
          setUrl(dataToAdd.url);
          setTotalEpisodes(dataToAdd.totalEpisodes);
          finishLoading();
        }
      });
  }

  //FETCH EPISODES FROM RSS FEED USING rss2json API TO FETCH AS JSON
  const fetchPodcast = () => {
    const fetchUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&order_dir=desc&count=${totalEpisodes}&api_key=${RSS2JSON_API_KEY}`;
    axios
      .get(fetchUrl)
      .then((res) => {
        const data = res.data;
        if(data && data.feed && data.items) {
          const details = {
            image: data.feed.image,
            title: data.feed.title,
            description: data.feed.description,
            author: data.feed.author,
          }

          const episodes = data.items.map( (item) => {
            return {
              id: item.guid,
              title: item.title,
              date: item.pubDate,
              duration: item.enclosure.duration,
            }
          });

          const dataToAdd = {
            details: details,
            episodes: episodes
          };

          setDataToCache({key: 'PODCAST', id: podcastId, data: dataToAdd});
          setDetails(dataToAdd.details);
          setEpisodes(dataToAdd.episodes);
        }
        finishLoading();
      });
  }

  useEffect(() => {
    initLoading();
    if(podcastId){
      //TRY TO GET PODCAST URL AND TOTAL EPISODES FROM LOCAL STORAGE
      let dataFromCache = getDataFromCache({key: 'PODCAST_URL', id: podcastId});
      if(dataFromCache) {
        setUrl(dataFromCache.data.url);
        setTotalEpisodes(dataFromCache.data.totalEpisodes);
        finishLoading();
      }else{
        fetchPodcastUrl();
      }
    }
  }, [podcastId]);

  useEffect(() => {
    initLoading();
    if(url && totalEpisodes){
      //TRY TO GET DETAILS AND EPISODES FROM LOCAL STORAGE
      let dataFromCache = getDataFromCache({key: 'PODCAST', id: podcastId});
      if(dataFromCache) {
        setDetails(dataFromCache.data.details);
        setEpisodes(dataFromCache.data.episodes);
        finishLoading();
      }else{
        fetchPodcast();
      }
    }
  }, [url, totalEpisodes, podcastId]);


  return {
    details,
    episodes,
    url,
    totalEpisodes
  }
}

export default usePodcast;
