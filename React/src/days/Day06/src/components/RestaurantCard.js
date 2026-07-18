      // default imports
import { CDN_URL } from '../utils/constants';   // named imports

// dynamically passing data to components
// passing props to a functions
// props is a property(an arguments) a js object that we can pass in the functional componnets(function)
const RestaurantCard = (props) => {
  const { resData } = props;    // destructing of objects

  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId , sla } =  resData?.info;

  const {deliveryTime} = sla;

  return (
    <div className='res-card' style={{backgroundColor : '#f2f3f5'}}>
      <img src={CDN_URL+cloudinaryImageId} 
      className='res-logo'
      />
        <h3>{name}</h3>
        <h4>{cuisines?.join(", ")}</h4>
        <h4>{avgRating}⭐</h4>
        <h4>{costForTwo}</h4>
        <h4>{deliveryTime} minutes</h4>
    </div>
  )
};

export default RestaurantCard;