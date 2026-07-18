import Shimmer from './Shimmer';
import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const Body = () => {
  // 1. All State Hooks (Pristine master list + active UI filtered list)
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  //const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setsearchText] = useState("");

  console.log("Body rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4249623&lng=77.3378599&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
    
      const json = await data.json();
      
      // Look up card elements dynamically in case the index changes layout positions
      const restaurantCard = json?.data?.cards?.find(
        (c) => c?.card?.card?.id === "restaurant_grid_listing"
      );
      
      const resList = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        || json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        || [];

      // Populating both lists initially so your standard UI shows everything
      setListOfRestaurants(resList);
      setFilteredRestaurants(resList);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      //setListOfRestaurants([]); 
      setFilteredRestaurants([]);
    }
  };

  // 2. Conditional Rendering Guard Clause (Clean Shimmer fallback UI)
  if (!listOfRestaurants || listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  // 3. UI Component View Return
  return (
    <div className='body'>
      <div className='filter'>
        <div className='search'>
          <input 
            type="text"
            className='search-box' 
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />

          <button onClick={() => {
            // Filter using the original pristine master list
            const filtered = listOfRestaurants.filter((res) =>
              res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(filtered);
            setFilteredRestaurants(filtered);
          }}>
            Search
          </button>
        </div> {/* ✅ Fixed: Properly closed the search container div */}

        <button 
          className='filter-button' 
          onClick={() => {
            // Filter rating updates out of the master list
            const filteredList = listOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4
            );
            console.log(filteredList);
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div> {/* ✅ Fixed: Properly closed the filter container div */}

      <div className='res-container'>
        {/* ✅ Map through filteredRestaurants so your original master list stays protected */}
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant?.info?.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
