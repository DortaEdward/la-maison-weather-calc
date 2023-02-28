import { useState } from 'react'
import data from './test.json';
import './App.css'

function App() {
  const [currentState, setCurrentState] = useState({
    state:'ny',
    day:'Mon',
    weather:"31\u00b0"
  });

  const [filter,setFilter] = useState<string>('')

  return (
    <div className="bg-neutral-700 w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <div className='w-[390px] h-full bg-gradient-to-bl from-sky-400 to-sky-200 rounded overflow-auto flex flex-col gap-6 px-10'>
        <input onChange={(e) => setFilter(e.target.value)} type="text" className='px-4 py-2 mt-10 mb-5 rounded-lg sticky top-0 z-50 outline-none text-2xl' placeholder='Search for State' />
        {
          data.filter(el => el.state.toLowerCase().includes(filter.toLowerCase())).map(el => {
            return(
              <div className='flex items-end justify-between'>
                <div className='flex gap-4 items-end '>
                  <p className='text-2xl font-bold'>
                    {el.state}
                  </p>
                  <p className={`${parseInt(el.weather.Mon) > 60 ? 'text-red-400': 'text-sky-600'} font-semibold`}>{parseInt(el.weather.Mon) > 60 ? 'Ice': 'No Ice'}</p>
                </div>
                <p className='text-6xl'>{`${el.weather.Mon}\u00b0F`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App

// \u000b0