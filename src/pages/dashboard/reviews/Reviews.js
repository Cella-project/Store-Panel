import React, { useEffect } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import ListsCard from '../../../components/common/ListsCard';
import ReviewCard from '../../../components/reviews/ReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import languages from '../../../components/global/languages';

import './Reviews.scss';
import { useLocation } from 'react-router-dom';
import { productMutations, reviewMutations } from '../../../redux/mutations';
import { productActions, reviewActions } from '../../../apis/actions';
import Loading from '../../../components/global/Loading';

const Reviews = () => {
  const language = useSelector(state => state.language.language);
  const translate = languages[language];
  const reviews = useSelector(state => state.review.reviews);
  const productData = useSelector(state => state.product.productData);

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('product');

  useEffect(() => {
    document.title = 'Reviews • Store panel';

    dispatch(reviewMutations.setReviews(null));

    if (productId) {
      dispatch(productMutations.setProductData(null));
      dispatch(productActions.getProductData(productId));
      dispatch(reviewActions.getReviewsForProduct(productId));
    }
  }, [dispatch, productId]);

  let content = <Loading />;

  let cards = [
    { title: translate.reviews, content: 0, icon: "bi bi-stars" },
    { title: translate.activeReviews, content: 0, icon: "bi bi-stars" },
    { title: translate.inactiveReviews, content: 0, icon: "bi bi-stars" },
  ];

  if (reviews !== null && reviews.length === 0) {
    content = <div className='gray inter size-16px font-bold'>{translate.noReviewsToDisplay}</div>;
  }

  if (reviews !== null && reviews.length > 0) {
    const numOfReviews = reviews.length;
    const numOfActiveReviews = reviews.filter(review => review.status === 'Active').length;
    const numOfInactiveReviews = reviews.filter(review => review.status === 'InActive').length;

    cards = [
      { title: translate.reviews, content: numOfReviews, icon: "bi bi-stars" },
      { title: translate.activeReviews, content: numOfActiveReviews, icon: "bi bi-stars" },
      { title: translate.inactiveReviews, content: numOfInactiveReviews, icon: "bi bi-stars" },
    ];

    let sortedReviews = reviews.sort((a, b) => {
      return b.rate - a.rate;
    });

    content = sortedReviews.map((review) => {
      return (
        <ListsCard key={review._id}>
          <ReviewCard review={review} />
        </ListsCard>
      );
    });
  }

  return (
    <div className="reviews full-width" >
      <div className="reviews--braud-cramb gray inter size-16px font-bold">
        {translate.reviews} / {productData !== null ? productData.title : ''}
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

      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )

}

export default Reviews