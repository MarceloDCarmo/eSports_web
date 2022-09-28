import { useEffect, useState } from 'react'

import logoImg from './assets/logo-nlw.svg'

import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { GameBanner } from './components/GameBanner'
import { RegisteredAdBanner } from './components/RegisteredAdBanner'
import './styles/main.css'

import axios from 'axios'
import Carousel from 'better-react-carousel'
import { CarSimple } from 'phosphor-react'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

interface Ad {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[]
  yearsPlaying: number,
}

function App() {

  const [games, setGames] = useState<Game[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [hideCarouselArrow, setHideCarouselArrow] = useState<boolean>(false)
  const [selectedGame, setSelectedGame] = useState<string>('')

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(res => {
        setGames(res.data)
      })
      .catch(console.log)
  }, [])

  function getAds(gameId: string) {
    axios(`http://localhost:3000/games/${gameId}/ads`)
      .then(res => {
        setAds(res.data)
      })
  }

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui</h1>

      <Dialog.Root onOpenChange={() => setHideCarouselArrow(!hideCarouselArrow)}>
        <Carousel cols={6} rows={1} gap={24} hideArrow={hideCarouselArrow}>
          {games.map(game => {
            return (
              <Carousel.Item
                key={game.id}
              >
                <GameBanner
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                  onClick={() => { 
                    setSelectedGame(game.title)
                    getAds(game.id)
                  }}
                />
              </Carousel.Item>
            )
          })}
        </Carousel>
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/80 inset-0 fixed' />
          <Dialog.Content className='fixed bg-gradient-to-b w-full h-[450px] from-[#211933] to-[#16151A] px-10 inset-0 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 justify-center'>
            <Dialog.Title className='text-3xl font-black self-center mb-6'>{ads.length > 0 ? `Anúncios para jogar ${selectedGame}` : 'Ops!'}</Dialog.Title>
            {
              ads.length > 0 ?
                <Carousel cols={6} rows={1} gap={24}>
                  {
                    ads.map(ad => (
                      <Carousel.Item
                        key={ad.id}
                      >
                        <RegisteredAdBanner
                          data={ad}
                        />
                      </Carousel.Item>
                    ))
                  }
                </Carousel>
                :
                <div className='h-[300px] text-xl flex items-center justify-center'>
                  Não há anúncios publicados para esse game
                </div>
            }
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App 
