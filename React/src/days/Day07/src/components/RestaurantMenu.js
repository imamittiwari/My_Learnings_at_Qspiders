
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    },[])


    const fetchMenu = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4249623&lng=77.3378599&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json(); 

        setResInfo(json.data);
    };
    
    const restaurantsInfo = resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants[2]?.info//.restaurants;


    //const { name, cuisines, costForTwo } = restaurantsInfo;

    return resInfo === null ? (
        <Shimmer />
    ) : (
        <div className="menu">
            <h1> {restaurantsInfo.name}</h1>
            <h2>{ restaurantsInfo.cuisines.join(", ")}</h2>
            <h2> { restaurantsInfo.costForTwo}</h2>
            <h2> { restaurantsInfo.avgRating}*</h2>
    
        </div>
    );
};

export default RestaurantMenu;