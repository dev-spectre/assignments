import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector(store => store.cart.items);
  console.log(cartItems);
  return (
    <nav className="mb-5 flex items-center justify-between border-b-2 border-neutral-800 px-4 shadow-lg">
      <a>
        <img
          className="h-24 mix-blend-color-burn"
          alt="logo"
          src="https://yt3.ggpht.com/ytc/AKedOLSpK3T_2RxkMYb-pk9oENQB0NvYpeOdXRgQe8i5=s800-c-k-c0x00ffffff-no-rj"
        />
      </a>
      <ul className="flex gap-7">
        <li>
          <Link
            className="decoration-2 underline-offset-4 hover:underline"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="decoration-2 underline-offset-4 hover:underline"
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="decoration-2 underline-offset-4 hover:underline"
            to="/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="decoration-2 underline-offset-4 hover:underline"
            to="/cart"
          >
            Cart ({cartItems.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
