export default  {
    name: 'storage',
  
    find(storageKey) {

        if(window.localStorage){
            return window.sessionStorage.getItem(storageKey);
        }
        if(window.sessionStorage){
          return window.sessionStorage.getItem(storageKey);
      } 

    }
  }