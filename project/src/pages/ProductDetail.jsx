import { discountedPrice, discountBadge, stockLabel } from '../productUtils'
import StarRating from '../components/StarRating'
import './ProductDetail.css'

const fallbackSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="none"><rect width="400" height="400" fill="#f1f0ee"/><path d="M200 140c-26 0-48 22-48 48s22 48 48 48 48-22 48-48-22-48-48-48zm0 20c15.4 0 28 12.6 28 28s-12.6 28-28 28-28-12.6-28-28 12.6-28 28-28z" fill="#c9c6c0"/><rect x="40" y="240" width="320" height="20" rx="10" fill="#c9c6c0"/></svg>'
  )

export default function ProductDetail({ product, onBack }) {
  if (!product) return null

  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage > 0
  const stock = stockLabel(product.stock)
  const stockKey = stock.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="detail">
      <button className="detail__back" onClick={onBack}>
        <span aria-hidden="true">←</span> Back to products
      </button>

      <div className="detail__card">
        <div className="detail__media">
          <img
            src={product.thumbnail}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src = fallbackSvg
            }}
          />
          {hasDiscount && (
            <span className="detail__badge">{discountBadge(product.discountPercentage)}</span>
          )}
        </div>

        <div className="detail__info">
          <h1 className="detail__title">{product.title}</h1>
          {product.brand ? (
            <p className="detail__brand">{product.brand}</p>
          ) : (
            <p className="detail__brand detail__brand--none">No brand</p>
          )}

          <div className="detail__rating">
            <StarRating rating={product.rating} />
            <span className="detail__rating-value">
              {product.rating.toFixed(1)} / 5.0
            </span>
          </div>

          <p className="detail__price">
            {hasDiscount ? (
              <>
                <span className="detail__price-original">${product.price.toFixed(2)}</span>
                <span className="detail__price-now">${finalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="detail__price-now">${product.price.toFixed(2)}</span>
            )}
          </p>

          <div className="detail__media-small">
            <img
              src={product.thumbnail}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.src = fallbackSvg
              }}
            />
            {hasDiscount && (
              <span className="detail__badge detail__badge--small">
                {discountBadge(product.discountPercentage)}
              </span>
            )}
          </div>

          <span className={`detail__stock detail__stock--${stockKey}`}>{stock}</span>

          <p className="detail__meta">
            {hasDiscount
              ? `Save $${(product.price - finalPrice).toFixed(2)} (${discountBadge(
                  product.discountPercentage
                )})`
              : 'Currently full price'}
          </p>
        </div>
      </div>
    </div>
  )
}
