import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick, paragraph } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Summary = () => {
   const [article, setArticle] = useState({ url: '', len: '', summary: '' });
   const [linkHistory, setLinkHistory] = useState([]);
   const [getSummary, { data, isLoading }] = useLazyGetSummaryQuery();

   useEffect(() => {
      const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles')) // To give the data back to us

      if (articleFromLocalStorage) {
         setLinkHistory(articleFromLocalStorage)
      }
   }, []); // Empty -> executed at the start of the app

   const handleSubmit = async (e) => {
      e.preventDefault();  // Browser won't reload application
      // API request
      const { data } = await getSummary({ articleUrl: article.url, pLength: article.len });

      if (data?.summary) {
         const newArticle = { ...article, summary: data.summary };
         const updatedAllArticles = [newArticle, ...linkHistory];

         setArticle(newArticle);
         setLinkHistory(updatedAllArticles);
         
         localStorage.setItem('articles', JSON.stringify(updatedAllArticles)) // ls Only can contain strings
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
                 className='absolute right-20 my-2 md:mr-5 sm:mr-2 mr-0 w-5'/>
            <input type='number'
                   placeholder='፨'
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
         <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {linkHistory.map((item, index) => (
               <div
                  key={`link-${index}`}
                  onClick={() => setArticle(item)} // without making a call
                  className='link_card'
               >
                  <div className='copy_btn'>
                     <img src={copy} alt='copy icon' className='w-[40%] h-[40%] object-contain'/>
                  </div>
                  <p className='history_p'>{item.url}</p>
               </div>
            ))}
         </div>
      </div>
      {/* Display Results */}
      <div className=''>

      </div>
    </section>
  )
}

export default Summary;