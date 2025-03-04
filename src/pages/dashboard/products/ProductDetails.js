import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import GreenCard from "../../../components/common/GreenCard";
import ProductInfo from "../../../components/products/ProductInfo";
import ProductControl from "../../../components/products/ProductControl";

import Popup from "../../../components/common/PopupForm";
import { useDispatch, useSelector } from "react-redux";
import { productActions, reviewActions } from "../../../apis/actions";
import { productMutations, reviewMutations } from "../../../redux/mutations";
import languages from "../../../components/global/languages";
import ListsCard from "../../../components/common/ListsCard";
import ReviewCard from "../../../components/reviews/ReviewCard";

import "./ProductDetails.scss";

const ProductDetails = () => {
  const params = useParams();
  const product = useSelector((state) => state.product.productData);
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.language.language);
  const reviews = useSelector((state) => state.review.reviews);
  const translate = languages[language];
  const [popupShown, setPopupShown] = useState(false);
  const [header, setHeader] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productMutations.setProductData(null));
    dispatch(productActions.getProductData(params.id));
    dispatch(reviewMutations.setReviews(null));
    dispatch(reviewActions.getReviewsForProduct(params.id));
  }, [dispatch, params.id]);

  product && (document.title = `${product.title} • Store Panel`);

  let cards = [
    { title: translate.quantity, content: 0, icon: "bi bi-box-seam" },
  ];
  if (product && product !== null) {
    cards = [
      { title: translate.quantity, content: product.avilableQuantity, icon: "bi bi-box-seam" },
    ];
  }
  const hasDiscount = product?.discount?.hasDiscount;

  const handleTagDelete = (tagId) => {
    dispatch(productActions.deleteProductTag({
      _id: params.id,
      tagId: tagId
    }, translate.areYouSureDeleteProductTag, translate.productTagDeletedSuccessfully, translate.someThingWentWrongPleaseTry));
  };
  const handleColorDelete = (colorId) => {
    dispatch(productActions.deleteProductColor({
      _id: params.id,
      colorId: colorId
    }, translate.areYouSureDeleteProductColor, translate.productColorDeletedSuccessfully, translate.someThingWentWrongPleaseTry));
  };

  const handleSizeDelete = (sizeId) => {
    dispatch(productActions.deleteProductSize({
      _id: product._id,
      sizeId: sizeId
    }, translate.areYouSureDeleteProductSize, translate.productSizeDeletedSuccessfully, translate.someThingWentWrongPleaseTry));
  };

  const addProductTag = () => {
    setPopupShown(true);
    setHeader(translate.addProductTag);
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductColor = () => {
    setPopupShown(true);
    setHeader(translate.addProductColor);
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductSize = () => {
    setPopupShown(true);
    setHeader(translate.addProductSize);
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }
  const decreaseQuantity = () => {
    setPopupShown(true);
    setHeader(translate.decreaseQuantity);
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="product-details--container full-width flex-col-left-start2col">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={header} data={product} />
      }
      {product && (
        <>
          <div className="flex-row-left-start2col product-details full-width">
            <div className="width-90-100 product-details">
              <ProductInfo
                product={product}
              />
            </div>
            <div className="flex-row-between product-details width-10-100">
              <ProductControl id={product._id} />
            </div>
          </div>
          <div className='flex-col-center shadow-2px inter radius-15px white-bg full-width'>
            <div className="product-details--tags flex-row-center full-width">
              <button className={`add-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={addProductTag}>
                {translate.addTag}
              </button>
            </div>
            {product.tags.length > 0 ? (
              <div className="product-details--tags flex-row-center full-width" >
                <PerfectScrollbar options={{ axis: 'x' }} className="product-details--scroll--cont flex-row-left-start">
                  {product.tags.map((tag) => (
                    <div key={tag._id} className="product-details--tags--tag margin-4px-H shadow-2px radius-20px flex-row-between size-14px lavender-bg">
                      <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.title}</span>
                      <button className={`product-details--tags--tag--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer`} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                    </div>
                  ))}
                </PerfectScrollbar>
              </div>
            ) : (
              <p className="gray inter size-18px margin-12px-H text-shadow">{translate.noTagsToDisplay}</p>
            )}
          </div>
          <div className="product-details--info full-width flex-row-between2col">
            {
              cards.map((card, index) => {
                return (
                  <GreenCard title={card.title} key={index}>
                    <div className="full-width flex-row-center">
                      <i className={`${card.icon}  ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-30px`}></i>
                      <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                    </div>
                  </GreenCard>
                );
              })
            }
            <GreenCard title={translate.sizes} icon={'bi bi-plus-circle'} iconClickHandle={addProductSize}>
              <div className="product-details--sizes flex-row-center flex-wrap">
                {product.sizes.length > 0 ? (
                  product.sizes.map((size, index) => (
                    <div key={index} className="product-details--sizes flex-row-center flex-wrap">
                      <div className="mint-green-bg shadow-2px margin-6px-H radius-20px white flex-row-between">
                        <div className="product-details--sizes--size font-bold size-20px ">{size.title}</div>
                        <i
                          className={`product-details--sizes--delete shadow-2px bi bi-trash pointer size-12px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} white-bg radius-circular flex-row-center`}
                          onClick={() => handleSizeDelete(size._id)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="gray inter size-18px margin-12px-H text-shadow">{translate.noSizesToDisplay}</p>
                )
                }
              </div>
            </GreenCard>
            <GreenCard title={translate.colors} icon={'bi bi-plus-circle'} iconClickHandle={addProductColor}>
              <div className="product-details--colors flex-row-center flex-wrap">
                {product.colors.length > 0 ? (
                  product.colors.map((color, index) => (
                    <div key={index} className="product-details--colors flex-row-center flex-wrap">
                      <div style={{ backgroundColor: color.hexCode }} className=" shadow-5px margin-6px-H full-width radius-circular flex-row-between">
                        <div className=" product-details--colors--color" />
                        <i
                          className={`product-details--colors--delete shadow-2px bi bi-trash pointer size-12px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} white-bg radius-circular flex-row-center`}
                          onClick={() => handleColorDelete(color._id)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="gray inter size-18px margin-12px-H text-shadow">{translate.noColorsToDisplay}</p>
                )
                }
              </div>
            </GreenCard>
            {
              hasDiscount &&
              <GreenCard title={translate.discount}>
                <div className="flex-col-center">
                  <p className="flex-row-center gray inter size-28px no-margin text-shadow">{product.discount.discountAmount}{product.discount.discountType === 'Percentage' && <i className="bi bi-percent"></i>}</p>
                  <p className="gray inter no-margin text-shadow">{product.discount.discountType}</p>
                </div>
              </GreenCard>
            }
          </div>
          <div className="full-width flex-col-center">
            <GreenCard title={translate.pieces} icon={'bi bi-dash-circle'} iconClickHandle={decreaseQuantity}>
              <div className="product-details--piece flex-row-center flex-wrap">
                {product.pieces.length > 0 ? (
                  product.pieces.map((piece, index) => (
                    <div key={index} className="product-details--piece flex-row-between radius-10px gray shadow-2px flex-wrap">
                      <div className="flex-col-center">
                        <div className="full-width size-18px">
                          {translate.size}: {piece.size}
                        </div>
                        <div className="full-width size-18px">
                          {translate.color}: {piece.color.title}
                        </div>
                      </div>
                      <div className={`product-details--piece--quantity ${language === 'ar' ? 'ar' : 'en'} margin-12px-H`}>
                        <i className={`bi bi-bookmark-fill mint-green flex-col-top-start size-38px`}>
                          <span style={{ position: 'absolute', fontStyle: 'normal' }} className={`size-22px pt-sans ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{piece.quantity}</span>
                        </i>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="gray inter size-18px margin-12px-H text-shadow">{translate.noPiecesToDisplay}</p>
                )
                }
              </div>
            </GreenCard>
          </div>

          <div className="full-width flex-col-center">
            <GreenCard title={translate.reviews}>
              <PerfectScrollbar className="review-scroll--cont full-width flex-col-top-start">
                {(reviews && reviews.length > 0) ? (
                  reviews
                    .slice()
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 3)
                    .map((review) => (
                      <ListsCard key={review._id} width="full-width">
                        <ReviewCard review={review} />
                      </ListsCard>
                    ))
                ) : (
                  <p className="gray inter size-16px font-bold">{translate.noReviewsToDisplay}</p>
                )
                }
              </PerfectScrollbar>
              <Link to={`/store-panel/Reviews?product=${product._id}`} className="pointer lists-card--link">
                <i className={`bi bi-arrow-${language === 'ar' ? 'left' : 'right'} flex-row-right-start`}></i>
              </Link>
            </GreenCard>
          </div>
        </>)
      }
    </div>
  );
};
export default ProductDetails;
