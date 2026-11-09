export default function CheckList({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  return (
    <ul className={`checklist${className ? ` ${className}` : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <span className="check-icon">✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
