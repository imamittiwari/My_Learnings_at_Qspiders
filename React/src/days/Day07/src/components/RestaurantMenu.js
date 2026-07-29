import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
    const response = await fetch(
  "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4249623&lng=77.3378599&restaurantId=966519&catalog_qa=undefined&submitAction=ENTER"
);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text(); // first get as text
    if (!text) {
      throw new Error("Empty response from server");
    }

    const json = JSON.parse(text); // safer than .json() sometimes
    setResInfo(json.data);
  } catch (err) {
    console.error("Failed to fetch menu:", err);
    // You can set an error state here if you want
  };
  };

  if (resInfo === null) return <Shimmer />;

  // Safer extraction – find the first card that actually has itemCards
  const regularCards =
    resInfo?.cards?.find(
      (c) => c?.groupedCard?.cardGroupMap?.REGULAR
    )?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // Collect all itemCards from every category
  const itemCards = regularCards
    .map((c) => c?.card?.card?.itemCards)
    .filter(Boolean)
    .flat();

  // Optional: also get restaurant name / basic info
  const restaurantInfo =
    resInfo?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info;

  console.log("Restaurant Info:", restaurantInfo);
  console.log("Menu Items:", itemCards);

  return (
    <div className="restaurant-card">
      {restaurantInfo && (
        <>
          <h1>{restaurantInfo.name}</h1>
          <p>
            {restaurantInfo.cuisines?.join(", ")} •{" "}
            {restaurantInfo.costForTwoMessage}
          </p>
        </>
      )}

      <div className="menu">
        <h2>Menu</h2>
        <ul>
          {itemCards?.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} – ₹
              {(item.card.info.price || item.card.info.defaultPrice) / 100}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
   //const { name, cuisines, costForTwo, avgRating, sla, locality } = resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants[2]?.info;

    //console.log(resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants[2]?.info)

     {/* <h1> { name }</h1>
            <h3>{ cuisines.join(", ") }</h3>
            <h3> { costForTwo }</h3>
            <h3> { avgRating }*</h3>
            <h3> { sla.deliveryTime } min </h3>
            <h3>{ locality}</h3>  */}