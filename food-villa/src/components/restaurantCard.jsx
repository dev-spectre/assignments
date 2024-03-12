/* eslint-disable react/prop-types */
import { FOOD_IMG_URL, ratingStarImg } from "../constants";
import { Link } from "react-router-dom";

function Restaurant({
  name,
  cloudinaryImageId,
  avgRatingString,
  sla,
  cuisines,
  locality,
  areaName,
  aggregatedDiscountInfoV3,
  city,
  id,
}) {
  const path = `${name}-${locality}-${areaName}-${city}-${id}`
    .replaceAll(" ", "-")
    .match(/[A-Za-z0-9-]*/g)
    .map((char) => char)
    .join("")
    .toLocaleLowerCase();
  return (
    <Link
      className="overflow-hidden rounded-md border-2 border-stone-600"
      to={`/restaurants/${path}`}
    >
      <section className="relative h-44 overflow-hidden">
        <img
          className="relative top-[50%] mt-[-50%] w-[100%] object-cover object-center"
          src={`${FOOD_IMG_URL}${cloudinaryImageId}`}
          alt="img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <p className="absolute bottom-2 left-0 right-0 text-center text-2xl font-extrabold">
            {aggregatedDiscountInfoV3?.header}{" "}
            {aggregatedDiscountInfoV3?.subHeader}
          </p>
        </div>
      </section>
      <section className="px-3 py-2">
        <div className="">
          <h3 className="text-lg font-bold tracking-wide">{name}</h3>
          <p className="my-1">
            {ratingStarImg} {avgRatingString} • {sla.slaString}
          </p>
        </div>
        <div className="text-sm text-neutral-400">
          <p>{cuisines.join(", ")}</p>
          <p>{areaName}</p>
        </div>
      </section>
    </Link>
  );
}

export default Restaurant;
