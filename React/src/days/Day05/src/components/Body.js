import { useState } from 'react';
import RestaurantCard from './RestaurantCard';


import resObj from '../utils/mockData';

// not using keys (not acceptable) <<<< index as key <<<<<< unique id (best practice)
const Body = () => {

// Use state to manage the restaurant list that changes on screen

// *when ever state variable updates react will rerenders the components.
  const [listOfRestaurants, setListOfRestaurants] = useState(resObj.restaurants);

  return (

    <div className='body'>

      <div className='filter'>

        <button 
          className='filter-button' 
          onClick={() => {
            
            // filter logic 
            const filteredList = resObj.restaurants.filter(
              (res) => res.info.avgRating > 4
            );
            console.log(filteredList);
          
            setListOfRestaurants(filteredList);  // update ui
            }}>
              Top Rated Restaurants
        </button>
  
      </div>


      <div className='res-container'>


        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.info.id}
            resData={restaurant}
            />

        ))}


      </div>
    </div>
  )
};

export default Body;