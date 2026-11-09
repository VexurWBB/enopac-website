type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

/** Content stays readable before hydration and when scripts fail. */
export default function Reveal({ children, className = '' }: RevealProps) {
  return <div className={`reveal is-visible${className ? ' ' + className : ''}`}>{children}</div>
}
