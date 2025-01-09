import React, { useState } from 'react';
import UserTopSection from '../component/UserTopSection';
import UserMiddleSection from '../component/UserMiddleSection';
import UserBottomSection from '../component/UserBottomSection';
import CartIcon from '../component/CartIcon';
import CartOverlay from '../component/CartOverlay';
import { Box } from '@mui/material';
import { useRef } from 'react';
const Users = () => {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const bottomSectionRef = useRef(null); // Ref to scroll to UserBottomSection

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <>
    <Box
      position="fixed"
      right={16}
      top="7%"
      sx={{
        transform: 'translateY(-50%)',
        bgcolor: 'white',
        borderRadius: '4px',
        boxShadow: 2,
        p: 1,
        zIndex: 1100,
        backgroundColor: '#02bb00'
      }}
    >
      <CartIcon onClick={showCartHandler} />
    </Box>
      <Box>
        {cartIsVisible && <CartOverlay onClose={hideCartHandler} />}
        <UserTopSection scrollToBottom={() => bottomSectionRef.current.scrollIntoView({ behavior: 'smooth' })} />
        <UserMiddleSection />
        <UserBottomSection ref={bottomSectionRef} />
      </Box>
    </>
  );
};

export default Users;
