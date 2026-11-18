
function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove
}) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>{item.artist}</p>

        <p>${item.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button
            type="button"
            onClick={() => onDecrement(item.id)}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrement(item.id)}
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
        </div>

        <p>
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
