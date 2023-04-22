import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick, paragraph } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Summary = () => {
   const [article, setArticle] = useState({ url: '', len: 20, summary: '' });
   const [linkHistory, setLinkHistory] = useState([]);
   const [copied, setCopied] = useState('');
   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

   useEffect(() => {
      const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles')) 

      if (articleFromLocalStorage) {
         setLinkHistory(articleFromLocalStorage)
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      // API request
      const { data } = await getSummary({ articleUrl: article.url, pLength: article.len });

      if (data?.summary) {
         const newArticle = { ...article, summary: data.summary };
         const updatedAllArticles = [newArticle, ...linkHistory];

         setArticle(newArticle);
         setLinkHistory(updatedAllArticles);
         
         localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
      }
   };

   const handleCopy = (copyUrl) => {
      setCopied(copyUrl);
      navigator.clipboard.writeText(copyUrl);
      setTimeout(() => setCopied(false), 3000);
   }

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
                 className='absolute right-[50px] my-2 sm:mr-12 mr-3 w-5'/>
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
                  onClick={() => setArticle(item)}
                  className='link_card'
               >
                  <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                     <img src={copied === item.url ? tick : copy} 
                          alt='copy icon' 
                          className='w-[40%] h-[40%] object-contain'/>
                  </div>
                  <p className='history_p'>{item.url}</p>
               </div>
            ))}
         </div>
      </div>
      {/* Display Results */}
      <div className='flex justify-center items-center my-10 max-w-full'>
         {isFetching 
            ? (<img src={loader} alt='loader' className='w-20 h-20 object-contain'/>) 
            : error ? (
               <p className='error_p'>Well, that was not supposed to happen ...<br/>
               <span className='font-satoshi text-gray-700'>{error?.data?.error}</span></p>)
            : (article.summary && 
                  (<div className='flex flex-col gap-3'>
                     <h2 className='artical_h2'>Article <span className='blue_gradient'>Summary</span></h2>
                     <div className='summary_box'>
                        <p className='summary_p'>{article.summary}</p>
                     </div>
                  </div>)
              )
          }
      </div>
    </section>
  )
}

export default Summary;