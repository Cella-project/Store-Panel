import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import languages from '../../../components/global/languages'
import './Home.scss';


const Home = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  useEffect(() => {
    document.title = 'Home • Store Panel';
  }, [dispatch]);

  let cards = [
    { title: 'Sales', content: 0, icon: "bi bi-currency-dollar" },
    { title: 'Customers', content: 0, icon: "bi bi-people" },
    { title: 'Products', content: 0, icon: "bi bi-box-seam" },
    { title: 'Orders History', content: 0, icon: "bi bi-receipt" },
  ]

  
  
  return (
    <div className="home full-width" >
      <div className="home--braud-cramb inter gray size-16px font-bold">
        {translations.home}
      </div>

    </div>
  );
}

export default Home;