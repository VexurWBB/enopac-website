import Button from './Button'
import { useBooking } from '../booking/BookingProvider'
import { site } from '../../data/site'

type BookingButtonProps = {
  variant?: 'primary' | 'outline' | 'ghost'
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function BookingButton({
  variant = 'primary',
  children,
  className,
  onClick,
}: BookingButtonProps) {
  const { openBooking } = useBooking()

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => {
        onClick?.()
        openBooking()
      }}
    >
      {children ?? `${site.cta} →`}
    </Button>
  )
}
