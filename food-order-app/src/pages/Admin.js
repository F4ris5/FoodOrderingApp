import { useContext, useState } from 'react';
import AdminTopSection from '../component/AdminTopSection';
import AdminBottomSection from '../component/AdminBottomSection';
import itemsContext from '../folder/items-context';
import { Box } from '@mui/material';
import AdminFoodForm from '../component/AdminFoodForm';

const Admin = () => {
  const itemCtx = useContext(itemsContext);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const addNewFoodHandler = (newFood) => {
    itemCtx.addFood(newFood); // Use context to add food
  };

  const toggleFormHandler = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  // Function to handle deleting food
  const deleteFoodHandler = (foodId) => {
    itemCtx.removeFood(foodId);
  };

  return (
    <>
      <AdminTopSection onAddFood={toggleFormHandler} />
      {isFormVisible && (
        <Box sx={{ padding: '20px' }}>
          <AdminFoodForm onAddFood={addNewFoodHandler} onCloseForm={toggleFormHandler} />
        </Box>
      )}
      <AdminBottomSection  foods={itemCtx.foods} onDeleteFood={deleteFoodHandler} />
    </>
  );
};

export default Admin;
