
import { useState } from "react";
import { Link } from "react-router-dom";

function CheckoutPage({ cart, cartSubtotal, onClearCart }) {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    cardDetails: ""
  });

  const [errors, setErrors] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onClearCart();
    setIsConfirmed(true);
  }

  if (isConfirmed) {
    return (
      <main className="confirmation-page">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been confirmed.</p>
        <Link to="/">Continue Shopping</Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Your Cart Is Empty</h1>
        <Link to="/">Browse Records</Link>
      </main>
    );
  }

  const fields = [
    { name: "fullName", label: "Full Name" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "postalCode", label: "Postal Code" },
    { name: "cardDetails", label: "Card Details (Demo Only)" }
  ];

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <section className="checkout-form-section">
          <h2>Shipping and Payment Information</h2>

          <p>
            This is a classroom demonstration.
            Do not enter real payment details.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>
                  {field.label}
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  autoComplete="off"
                />

                {errors[field.name] && (
                  <small className="form-error">
                    {errors[field.name]}
                  </small>
                )}
              </div>
            ))}

            <button type="submit" className="place-order">
              Place Order
            </button>
          </form>
        </section>

        <section className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="order-line" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>

              <p>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <h3>
            Total: ${cartSubtotal.toFixed(2)}
          </h3>
        </section>
      </div>
    </main>
  );
}

export default CheckoutPage;
