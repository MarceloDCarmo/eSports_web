import { DuoInfo } from './DuoInfo'

interface DuoInfoProps {
    id: string,
    hourEnd: string,
    hourStart: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[]
    yearsPlaying: number,
}

interface Props {
    data: DuoInfoProps
}

export function RegisteredAdBanner({ data }: Props) {
    return (
        <div className='bg-[#2F2F3F] h-[290px] w-[220px] py-3 px-4 text-white rounded-lg flex flex-col gap-4 justify-center'>
            <DuoInfo
                label='Nome'
                value={data.name}
            />

            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} anos`}
            />

            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />

            <DuoInfo
                label='Chamada de áudio?'
                color={`${data.useVoiceChannel ? 'text-success' : 'text-alert'}`}
                value={data.useVoiceChannel ? 'Sim' : 'Não'}
            />
        </div>
    )
}