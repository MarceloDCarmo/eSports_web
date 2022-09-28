import * as Dialog from '@radix-ui/react-dialog'

interface Props extends Dialog.DialogTriggerProps{
    bannerUrl: string,
    title: string,
    adsCount: number,
}

export function GameBanner({ bannerUrl, title, adsCount, ...rest }: Props) {
    return (
        <Dialog.Trigger className='relative rounded-lg overflow-hidden mt-8' {...rest} >
          <img src={bannerUrl} alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{title}</strong>
            <span className='text-zinc-300 text-sm block'>{adsCount} anúncio(s)</span>
          </div>
        </Dialog.Trigger>
    )
}