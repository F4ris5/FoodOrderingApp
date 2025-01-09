import './App.css';
import { Fragment, useContext } from 'react';
import { ItemsContextProvider } from './folder/items-context';
import Users from './pages/Users';
import Admin from './pages/Admin';
import FooterSection from './component/FooterSection.js';
import itemsContext from './folder/items-context';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'true';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);
  }, []);

  return (
    <ItemsContextProvider>
      <Fragment>
        <MainContent />
        <FooterSection />
      </Fragment>
    </ItemsContextProvider>
  );
}

function MainContent() {
  const itemCtx = useContext(itemsContext);

  return itemCtx.switchPage ? <Admin /> : <Users /> ;
}

export default App;
