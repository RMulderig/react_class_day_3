import './StarRating.css'

function Star({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.9l6.5-.95L12 2.5z" />
    </svg>
  )
}

export default function StarRating({ rating, max = 5 }) {
  const pct = Math.max(0, Math.min(rating / max, 1)) * 100
  const rounded = Math.round(rating * 10) / 10

  return (
    <div
      className="star-rating"
      role="img"
      aria-label={`Rating: ${rounded} out of ${max} stars`}
      title={`${rounded} / ${max}`}
    >
      <div className="star-rating__track">
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i} className="star-rating__star star-rating__star--empty" />
        ))}
      </div>
      <div className="star-rating__fill" style={{ width: `${pct}%` }}>
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i} className="star-rating__star star-rating__star--filled" />
        ))}
      </div>
    </div>
  )
}
