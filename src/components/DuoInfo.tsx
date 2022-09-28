interface Props {
    label: string,
    value: string
    color?: string
}

export function DuoInfo({label, value, color}: Props) {
    return (
        <div className='flex flex-col'>
            <span className='text-sm text-[#D4D4D8] py-1 px-4 font-semibold '>{label}</span>
            <strong className={`truncate ${ color != '' ? `${color}` : 'text-white'} px-4 text-sm font-bold `}>{value}</strong>
        </div>
    )
}