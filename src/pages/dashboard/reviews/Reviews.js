import React, { useEffect } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import ReviewCard from '../../../components/reviews/ReviewCard';
import { useSelector } from 'react-redux';
import languages from '../../../components/global/languages';

import './Reviews.scss';

export const reviewCards = [
  { reviewShown: false, customer: 'Admin admin', status: 'red', type: 'bi bi-box-seam', name: 'Blouse', rating: 4 },
  { reviewShown: false, customer: 'Admin admin', status: 'green', type: 'bi bi-box-seam', name: 'Blouse', rating: 4 },
  { reviewShown: false, customer: 'Admin admin', status: 'green', type: 'bi bi-box-seam', name: 'Blouse', rating: 4 },
  { reviewShown: false, customer: 'Admin admin', status: 'green', type: 'bi bi-box-seam', name: 'Blouse', rating: 4 },
  { reviewShown: false, customer: 'Admin admin', status: 'green', type: 'bi bi-box-seam', name: 'Blouse', rating: 4.5 },
];

const Reviews = () => {
  const language = useSelector(state => state.language.language);
  const translate = languages[language];
  // let active = 0;
  // let deactivated = 0;
  let products = 0;

  useEffect(() => {
    document.title = 'Reviews • Store panel';
  }, []);

  reviewCards.map((card) => {
    // if (card.status === 'green') {
    //   active++;
    // }
    // if (card.status === 'red') {
    //   deactivated++;
    // }
    if (card.type === 'bi bi-box-seam') {
      products++;
    }


    return card;
  });

  const cards = [
    { title: translate.productsReviews, content: products.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-box-seam" },
  ];

  return (
    <div className="reviews full-width" >
      <div className="reviews--braud-cramb gray inter size-16px font-bold">
        {translate.reviews}
      </div>
      <div className={`reviews--cards${language === 'ar' ? '-arabic' : ''}`}>
        {
          cards.map((card, index) => {
            return (
              <GreenCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} mint-green size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </GreenCard>
            );
          })
        }
      </div>
      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>

      <div className='flex-col-left-start inter gray'>
        {
          reviewCards.map((reviewCard, index) => {
            return (
              <ListsCard key={index}>
                <ReviewCard
                  visible={reviewCard.reviewShown}
                  customer={reviewCard.customer}
                  type={reviewCard.type}
                  name={reviewCard.name}
                  rating={reviewCard.rating}
                  status={reviewCard.status}
                />
              </ListsCard>
            )
          })
        }
      </div>
    </div>
  )

}

export default Reviews