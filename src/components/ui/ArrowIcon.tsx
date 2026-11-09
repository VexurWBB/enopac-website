type ArrowIconProps = {
  className?: string
}

export default function ArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <span className={`arrow-icon${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
