import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = UseCart();

    // Calculate the total price of the cart
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li className="list-unstyled" key={item.bookID}>
                                {item.quantity}x {item.title} | Subtotal ${(item.price * item.quantity).toFixed(2)}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeFromCart(item.bookID)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={() => clearCart()}>Checkout</button>
            <button className="btn btn-danger" onClick={() => clearCart()}>Clear Cart</button>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default CartPage;