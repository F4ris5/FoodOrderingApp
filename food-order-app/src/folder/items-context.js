import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const itemsContext = createContext({
  foods: [],
  cartItems: [],
  totalQuantity: 0,
  addFood: (food) => {},
  addToCart: (food) => {},
  removeFromCart: (id) => {},
  removeFood: (foodId) => {},
  switchPage: false,
  togglePage: () => {}
});

export const ItemsContextProvider = (props) => {
  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [switchPage, setSwitchPage] = useState(false);

  useEffect(() => {
    // Fetch food items from json-server
    axios.get('http://farisaiman.com/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food data:', error);
      });
  }, []);

  const addFoodHandler = (newFood) => {
    // Optionally, post the new food to the json-server
    axios.post('http://farisaiman.com/foods', newFood)
      .then(response => {
        setFoods((prevFoods) => [...prevFoods, response.data]);
      })
      .catch(error => {
        console.error('Error adding new food:', error);
      });
  };

  const removeFoodHandler = (foodId) => {
    // Optionally, delete the food from the json-server
    axios.delete(`http://farisaiman.com/foods/${foodId}`)
      .then(() => {
        setFoods((prevFoods) => prevFoods.filter(food => food.id !== foodId));
      })
      .catch(error => {
        console.error('Error removing food:', error);
      });
  };

  const addToCartHandler = (food) => {
        setCartItems((prevCartItems) => {
          const existingCartItemIndex = prevCartItems.findIndex(item => item.id === food.id);
          const existingCartItem = prevCartItems[existingCartItemIndex];
    
          let updatedCartItems;
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              amount: existingCartItem.amount + 1
            };
            updatedCartItems = [...prevCartItems];
            updatedCartItems[existingCartItemIndex] = updatedItem;
          } else {
            updatedCartItems = [...prevCartItems, { ...food, amount: 1 }];
          }
    
          return updatedCartItems;
        });
    
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
      };
    
      const removeFromCartHandler = (id) => {
        setCartItems((prevCartItems) => {
          const existingCartItemIndex = prevCartItems.findIndex(item => item.id === id);
          const existingCartItem = prevCartItems[existingCartItemIndex];
    
          let updatedCartItems;
    
          if (existingCartItem.amount === 1) {
            updatedCartItems = prevCartItems.filter(item => item.id !== id);
          } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedCartItems = [...prevCartItems];
            updatedCartItems[existingCartItemIndex] = updatedItem;
          }
    
          return updatedCartItems;
        });
    
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      };

  const togglePageHandler = () => {
    setSwitchPage((prevState) => !prevState);
  };

  return (
    <itemsContext.Provider value={{
      foods,
      cartItems,
      totalQuantity,
      addFood: addFoodHandler,
      removeFood: removeFoodHandler,
      addToCart: addToCartHandler,
      removeFromCart: removeFromCartHandler,
      switchPage,
      togglePage: togglePageHandler
    }}>
      {props.children}
    </itemsContext.Provider>
  );
};

export default itemsContext;
