import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { setDataToCache, getDataFromCache } from 'utility/storage';
import { LoadingContext } from 'providers';

const useList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [search, setSearch] =  useState('');
  const [filteredList, setFilteredList] = useState([]);
  // ACCESS THE LOADING CONTEXT VALUE
  const { initLoading, finishLoading } = useContext(LoadingContext);

  //FETCH EPISODES FROM RSS FEED USING rss2json API TO FETCH AS JSON
  const fetchPodcasts = () => {
    const fetchUrl = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    axios
      .get(fetchUrl)
      .then((res) => {
        const data = res.data;
        if(data && data.feed && data.feed.entry) {
          const dataToAdd = data.feed.entry.map( (item) => {
            return {
              id: item.id.attributes['im:id'],
              title: item.title.label,
              author: item['im:artist'].label,
              image: item['im:image'][2].label,
            }
          });

          setDataToCache({key: 'PODCAST_LIST', data: dataToAdd});
          setPodcasts(dataToAdd);
          finishLoading();
        }
      });
  }
  const handleSearch = ({value}) => {
    setSearch(value);
  }

  useEffect(() => {
    initLoading();
    //TRY TO GET DATA FROM LOCAL STORAGE
    let dataFromCache = getDataFromCache({key: 'PODCAST_LIST'});

    if(dataFromCache) { //SET DATA FROM CACHE IS EXIST
      setPodcasts(dataFromCache.data);
      finishLoading();
    }else{ //IF NOT WILL FETCH DATA FROM API
      fetchPodcasts();
    }
  }, []);

  useEffect(() => {
    setFilteredList(podcasts);
  }, [podcasts]);

  useEffect(() => {
    //FILTER LIST BY SEARCH INPUT
    const newList = podcasts.filter((el) => el.author.toLowerCase().includes(search.toLowerCase()) || el.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredList(newList);
  }, [search]);


  return {
    filteredList,
    search,
    handleSearch
  }
}

export default useList;
