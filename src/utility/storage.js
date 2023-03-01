const CACHE_TIME = 1000 * 60 * 60 * 24;

export const getDataFromCache = ({ key, id }) => {
  try {
    let dataToReturn = null;

    //RUN CLEAN LOCAL STORAGE EXPIRED DATA
    cleanStorage({key,id});

    //GET DATA FROM LOCAL STORAGE
    let dataStored = JSON.parse(localStorage.getItem(key)) ?? [];

    //RETURN ITEM IF EXISTS OR NULL IF NOT EXISTS
    if(dataStored){
      dataToReturn = dataStored.find(obj => {
        return obj.id === id;
      });
    }

    return dataToReturn;
  } catch(e) {
    console.error(e.message);
    return null;
  }
}

export const setDataToCache = ({ key, id, data }) => {
  try {
    //GET DATA FROM LOCAL STORAGE
    let dataStored = JSON.parse(localStorage.getItem(key)) ?? [];

    //CREATE NEW ITEM
    const newItem = {
      id,
      data,
      expiry: new Date().getTime() + CACHE_TIME
    };

    //ADD ITEM TO ARRAY OF ITEMS
    const newData = [...dataStored, newItem];

    //STORE NEW ARRAY IN LOCAL STORAGE
    localStorage.setItem(key, JSON.stringify(newData));
  } catch(e) {
    console.error(e.message);
  }
}

export const cleanStorage = ({ key, id }) => {
  try {
    //GET DATA FROM LOCAL STORAGE
    let data = localStorage.getItem(key);
    let deleted = false;

    //CHECK IF DATA IS STORED IN LOCAL STORAGE
    if(data){
      data = JSON.parse(data);
      const item = data.find(obj => {
        return obj.id === id;
      });

      //IF ITEM EXISTS CHECK IF IS EXPIRED
      if(item){
        //IF 1 DAY HAVE BEEN PASSED, IT REMOVES THE CACHE
        const expiry = item.expiry
        if (expiry && expiry <= Date.now() ) {
          delete data[key];
          deleted = true;
        }
      }
    }

    //STORE CLEANED DATA IN LOCAL STORAGE
    if(deleted){
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch(e) {
    console.error(e.message);
  }
}
