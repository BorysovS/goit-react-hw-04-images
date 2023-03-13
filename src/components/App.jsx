import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getImages } from '../services/serviceApi/serviceApi.js';
import { ImageGallery } from './ImageGallery/ImageGllery';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { animateScroll } from 'react-scroll';


export const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([]);
  // const [totalHits, setTotalHits] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  // const [error, setError] = useState('');

const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

 const searchFormSubmit = searchQuery => {
   setQuery(searchQuery);
   setPage(1);
   setItems([])
    
  };

  const handleLoadMore = () => {
    setPage(prevState => 
      prevState + 1
    );
    scrollOnMoreButton();
   };
  
  useEffect(() => {
    if (!query) {
      setVisibleBtn(false)
      return;
    }
    async function getFetchApi() {
      try {
        setIsLoading(true);

        const data = await getImages(query, page);
        setItems(pervState => [...pervState, ...data.hits]);
        // setTotalHits(data.totalHits);

        if (data.totalHits === 0) {
          toast.error('Nothing was found for your request', {
            duration: 1000,
          });
          setVisibleBtn(false)
        }
        if (data.totalHits > 12) { 
        setVisibleBtn(true);  
        }
        
      }
      catch (error) {
        // setError(error.message);
        console.log(error.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    getFetchApi();

  }, [query, page]);


    return (
      <Layout>
        <SearchBar onSubmit={searchFormSubmit} />
        <ImageGallery items={items} />
              {isLoading && <Loader />}
      {visibleBtn && <Button onClick={handleLoadMore} />}
        <GlobalStyle />
        <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8} />
      </Layout>
    );
};


