import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
import { CaretDown, Check, GameController } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { Input } from './Form/Input'

interface Game {
    id: string,
    title: string,
}

export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekdays] = useState<string[]>([])

    useEffect(() => {
        axios('http://localhost:3000/games')
            .then(res => {
                setGames(res.data)
            })
            .catch(console.log)
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name){
            alert('Preencha todos os campos!')
            return
        }

        try {
            await axios.post(`http://localhost:3000/games/${data.game}/ads`,
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: data.useVoiceChannel === 'on'
                })
                
            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error)            
            alert('Erro ao criar o anúncio!')            
        }
    }

    return (
        <Dialog.Portal className='overflow-visible'>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                    <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                    <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="game" className='font-semibold' >Qual o game?</label>
                            <Select.Root name='game'>
                                <Select.Trigger id='game' className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex items-center justify-between'>
                                    <Select.Value placeholder='Selecione o game que deseja jogar' />
                                    <Select.Icon>
                                        <CaretDown />
                                    </Select.Icon>
                                    <Select.Portal>
                                        <Select.Content>
                                            <Select.Viewport className='bg-zinc-600 rounded text-sm text-white p-3'>
                                                {
                                                    games.map(game => {
                                                        return (
                                                            <Select.Item key={game.id} value={game.id} className='py-1 px-2 rounded flex items-center just hover:bg-zinc-700' >
                                                                <Select.ItemText>{game.title}</Select.ItemText>
                                                                <Select.ItemIndicator className='ml-2'>
                                                                    <Check />
                                                                </Select.ItemIndicator>
                                                            </Select.Item>
                                                        )
                                                    })
                                                }
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Trigger>
                            </Select.Root>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Seu nome ou nickname</label>
                            <Input type="text" name='name' id='name' placeholder='Como te chamam dentro do game?' />
                        </div>

                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input type="number" name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="discord">Qual seu Discord?</label>
                                <Input type="text" name='discord' id='discord' placeholder='Usuario#0000' />
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="weekDays">Quando costuma jogar?</label>
                                <ToggleGroup.Root
                                    type='multiple'
                                    className='grid grid-cols-4 gap-2'
                                    value={weekDays}
                                    onValueChange={setWeekdays}
                                >
                                    <ToggleGroup.Item
                                        value='0'
                                        title='Domingo'
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='1'
                                        title='Segunda'
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='2'
                                        title='Terça'
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='3'
                                        title='Quarta'
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='4'
                                        title='Quinta'
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='5'
                                        title='Sexta'
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value='6'
                                        title='Sábado'
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>

                            <div className='flex flex-col gap-2 flex-1'>
                                <label htmlFor="hourStart">Qual horário do dia?</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input type="time" name='hourStart' id='hourStart' placeholder='De' />
                                    <Input type="time" name='hourEnd' id='hourEnd' placeholder='Até' />
                                </div>
                            </div>
                        </div>

                        <label className='mt-2 flex gap-2 text-sm items-center'>
                            <Checkbox.Root
                                name={'useVoiceChannel'}
                                className='w-6 h-6 p-1 rounded bg-zinc-900'
                            >
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className='mt-4 flex justify-end gap-4'>
                            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                            <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                                <GameController size={24} />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal >
    )
}