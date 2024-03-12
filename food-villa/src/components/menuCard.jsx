/* eslint-disable react/prop-types */
import { FOOD_IMG_URL } from "../constants";

function Menu({ name, description, imageId, price }) {
  return (
    <div className="mb-5 flex justify-between gap-4 rounded-sm border border-stone-500 p-3">
      <div>
        <div className="flex items-center gap-3 font-semibold">
          <h2 className="text-xl font-bold">{name}</h2>
          <p>{price && `₹${Math.floor(price / 100)}`}</p>
        </div>
        <p className="mt-2">{description}</p>
      </div>
      {imageId && (
        <img
          className="w-[20%] min-w-36 max-w-52 rounded-sm border-none"
          src={`${FOOD_IMG_URL}${imageId}`}
          alt=""
        />
      )}
    </div>
  );
}

export default Menu;
