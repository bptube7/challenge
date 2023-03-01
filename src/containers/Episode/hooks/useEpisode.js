import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { setDataToCache, getDataFromCache } from 'utility/storage';
import { LoadingContext } from 'providers';

const RSS2JSON_API_KEY = 'gppkxgwc9vfrvhrauebluh6nhf9f93w4j8nn7d7n';

const usePodcast = ({ podcastId, episodeId, url, totalEpisodes }) => {
  const [episode, setEpisode] = useState(null);
  // ACCESS THE LOADING CONTEXT VALUE
  const { initLoading, finishLoading } = useContext(LoadingContext);

  //FETCH EPISODE FROM RSS FEED USING rss2json API TO FETCH AS JSON
  const fetchEpisode = () => {
    const fetchUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&order_dir=desc&count=${totalEpisodes}&api_key=${RSS2JSON_API_KEY}`;
    axios
      .get(fetchUrl)
      .then((res) => {
        const data = res.data;
        if(data && data.items) {
          const episodeFiltered = data.items.find((item) => item.guid === episodeId);

          const episode = {
            title: episodeFiltered.title,
            description: episodeFiltered.description,
            audioLink: episodeFiltered.enclosure.link,
          }

          const dataToAdd = {
            episode: episode
          };

          setDataToCache({key: 'EPISODE', id: episodeId, data: dataToAdd});
          setEpisode(dataToAdd.episode);
          finishLoading();
        }
      });
  }

  useEffect(() => {
    initLoading();
    if(podcastId && episodeId && url && totalEpisodes){
      //TRY TO GET EPISODE FROM LOCAL STORAGE
      let dataFromCache = getDataFromCache({key: 'EPISODE', id: episodeId});
      if(dataFromCache) {
        setEpisode(dataFromCache.data.episode);
        finishLoading();
      }else{
        fetchEpisode();
      }
    }

  }, [podcastId, episodeId, url, totalEpisodes]);


  return {
    episode
  }
}

export default usePodcast;
