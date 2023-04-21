import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex flex-col justify-center items-center'>
      <nav className='w-full flex justify-between items-center mb-10 pt-3'>
         <img className='w-28 object-contain' src={logo} alt="logo" />
         <button type='button' 
                 onClick={() => window.open('https://github.com/MadMax8930/summarize-ai')}
                 className='black_btn' 
         >
            GitHub
         </button>
      </nav>
      <h1 className='head_text'>
         Summarize Articles with <br className='max-md:hidden' />
         <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
         Simplify your reading with Summize, an open-source article summarizer 
         that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  )
}

export default Hero;