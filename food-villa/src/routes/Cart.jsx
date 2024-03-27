import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "../store/slice/cart";
import Menu from "../components/menuCard";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="container p-5">
      <div className="text-center">
        <button
          className="my-5 rounded-md bg-black px-3 py-1"
          onClick={() => {
            const ret = clearCart();
            console.log(ret);
            dispatch(ret);
          }}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.map((item) => (
        <div className="mb-5 border" key={item.id}>
          <div>
            <Menu {...item} />
          </div>
          <div className="text-center">
            <button
              className="my-5 rounded-md bg-black px-3 py-2"
              onClick={() => {
                dispatch(removeItem(item.id));
              }}
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
