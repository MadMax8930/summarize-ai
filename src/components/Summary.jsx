import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick, paragraph } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Summary = () => {
   const [article, setArticle] = useState({ url: '', len: '', summary: '' });
   const [getSummary, { data, isLoading }] = useLazyGetSummaryQuery();
   const [allArticles, setAllArticles] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();  // Browser won't reload application
      // API request
      const { data } = await getSummary({ articleUrl: article.url, pLength: article.len });

      if (data?.summary) {
         const newArticle = { ...article, summary: data.summary };
         const updatedAllArticles = [newArticle, ...allArticles];

         setArticle(newArticle);
         setAllArticles(updatedAllArticles);
         console.log(newArticle);
      }
   };

  return (
    <section className='w-full max-w-xl mt-16 '>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
         <form className='relative flex justify-center items-center gap-1'
               onSubmit={handleSubmit}
         >
            <img src={linkIcon} alt='link icon' 
                 className='absolute left-0 my-2 ml-3 w-5'/>
            <input type='url' 
                   placeholder='Enter a URL'
                   value={article.url}
                   onChange={(e) => setArticle({...article, url: e.target.value})}
                   required
                   className='url_input peer'
            />
            <img src={paragraph} alt='paragraph icon' 
                 className='absolute right-20 my-2 mr-4 w-5'/>
            <input type='number'
                   placeholder='XX'
                   value={article.len}
                   onChange={(e) => setArticle({...article, len: e.target.value})}
                   className='num_input peer-focus:border-gray-700 peer-focus:text-gray-700' 
            />
            <button type='submit' 
                    className='submit_btn
                    peer-focus:border-gray-700 peer-focus:text-gray-700'>↵
            </button>
         </form>
         {/* Browser URL History */}
      </div>
      {/* Display Results */}
    </section>
  )
}

export default Summary;