import { discountedPrice, discountBadge, stockLabel } from '../productUtils'
import StarRating from './StarRating'
import './ProductCard.css'

export default function ProductCard({ product, onOpen }) {
  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage > 0
  const stock = stockLabel(product.stock)

  return (
    <article className="product-card" onClick={onOpen} role="button" tabIndex={0}>
      <div className="product-card__head">
        <h2 className="product-card__title">{product.title}</h2>
        {product.brand ? (
          <p className="product-card__brand">{product.brand}</p>
        ) : (
          <p className="product-card__brand product-card__brand--none">No brand</p>
        )}
        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__rating-value">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="product-card__media">
        {hasDiscount && (
          <span className="product-card__badge">{discountBadge(product.discountPercentage)}</span>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.classList.add('product-card__img--broken')
            e.currentTarget.src = fallbackSvg
          }}
        />
      </div>

      <div className="product-card__foot">
        <div className="product-card__prices">
          {hasDiscount && (
            <>
              <span className="product-card__price-original">${product.price.toFixed(2)}</span>
              <span className="product-card__price-now">${finalPrice.toFixed(2)}</span>
            </>
          )}
          {!hasDiscount && (
            <span className="product-card__price-now">${product.price.toFixed(2)}</span>
          )}
        </div>
        <span
          className={`product-card__stock product-card__stock--${stock
            .toLowerCase()
            .replace(/\s/g, '-')}`}
        >
          {stock}
        </span>
      </div>
    </article>
  )
}

const fallbackSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none"><rect width="200" height="200" fill="#f1f0ee"/><path d="M100 70c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24zm0 10c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14z" fill="#c9c6c0"/><rect x="20" y="120" width="160" height="10" rx="5" fill="#c9c6c0"/></svg>'
  )
