import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list, selectedCategory } = useContext(StoreContext);

  const filteredFood = selectedCategory === "All" 
    ? food_list 
    : food_list.filter(item => item.category === selectedCategory);

  return (
    <div className='food-display' id='food-display'>
      <h2>
        {selectedCategory === "All" 
          ? "Top Dishes Near You" 
          : `Our Best ${selectedCategory} Dishes`}
      </h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map(item => (
            <FoodItem 
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-items">No dishes found in {selectedCategory} category</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;