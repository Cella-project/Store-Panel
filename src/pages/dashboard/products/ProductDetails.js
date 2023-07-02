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
    { title: translate.numberOfOrders, content: 0, icon: "bi bi-box-seam" },
    { title: translate.successOrders, content: 0, icon: "bi bi-box-seam" },
    { title: translate.returnOrders, content: 0, icon: "bi bi-box-seam" },
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
    setHeader('Add Product Tag');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductColor = () => {
    setPopupShown(true);
    setHeader('Add Product Color');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductSize = () => {
    setPopupShown(true);
    setHeader('Add Product Size');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }
  const decreaseQuantity = () => {
    setPopupShown(true);
    setHeader('Decrease Quantity');
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
          <PerfectScrollbar options={{ axis: 'x' }} className="product-details--scroll--cont shadow-2px inter radius-15px white-bg full-width">
            {product.tags.length > 0 ? (
              <div className="product-details--tags flex-row-between full-width" >
                {product.tags.map((tag, index) => (
                  <div key={index} className="add-product--selected-item shadow-2px radius-15px flex-row-between size-14px lavender-bg text-shadow">
                    <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.title}</span>
                    <button className={`add-product--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                  </div>
                ))}
                <button className={`bi bi-plus-circle product-details--scroll--cont--add radius-circular mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={addProductTag} >
                </button>
              </div>
            ) : (
              <div className="product-details--tags flex-row-center full-width">
                <button className={`add-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={addProductTag}>
                  {translate.addTag}
                </button>
              </div>
            )}

          </PerfectScrollbar>
          <div className="full-width">
            <div className="full-width flex-row-between2col">
              {
                hasDiscount &&
                <div className="flex-col-center width-20-100">
                  <GreenCard title={translate.discount}>
                    <div className="product-details--discount flex-row-center">
                      <div className="product-details--discount--content flex-col-center">
                        <p className="gray inter size-28px margin-12px-H text-shadow">{product.discount.discountAmount}{product.discount.discountType === 'Percentage' && <i className="bi bi-percent"></i>}</p>
                        <p className="gray inter margin-12px-H text-shadow">{product.discount.discountType}</p>
                      </div>
                    </div>
                  </GreenCard>
                </div>
              }
              {
                cards.map((card, index) => {
                  return (
                    <GreenCard title={card.title} key={index}>
                      <div className="full-width flex-row-center">
                        <i className={`${card.icon} mint-green size-30px`}></i>
                        <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                      </div>
                    </GreenCard>
                  );
                })
              }

            </div>
          </div>
          <div className="full-width">
            <div className="full-width flex-row-top-start2col">
              <div className="flex-col-center width-50-100">
                <GreenCard title="Sizes" icon={'bi bi-plus-circle'} iconClickHandle={addProductSize}>
                  <div className="product-details--sizes flex-row-center flex-wrap">
                    {product.sizes.map((size, index) => (
                      <div key={index} className="product-details--sizes flex-row-center flex-wrap">
                        <div className="mint-green-bg shadow-2px margin-6px-H radius-circular white flex-row-between">
                          <div className="product-details--sizes--size font-bold size-20px ">{size.title}</div>
                          <i
                            className="product-details--sizes--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                            onClick={() => handleSizeDelete(size._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GreenCard>
              </div>
              <div className="flex-col-center margin-10px-H width-50-100">
                <GreenCard title="Colors" icon={'bi bi-plus-circle'} iconClickHandle={addProductColor}>
                  <div className="product-details--colors flex-row-center flex-wrap">
                    {product.colors.map((color, index) => (
                      <div key={index} className="product-details--colors flex-row-center flex-wrap">
                        <div style={{ backgroundColor: color.hexCode }} className=" shadow-5px margin-6px-H full-width radius-circular flex-row-between">
                          <div className=" product-details--colors--color" />
                          <i
                            className="product-details--colors--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                            onClick={() => handleColorDelete(color._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GreenCard>
              </div>
              <GreenCard title="Pieces" icon={'bi bi-dash-circle'} iconClickHandle={decreaseQuantity}>
                <div className="product-details--piece flex-row-center flex-wrap">
                  {product.pieces.map((piece, index) => (
                    <div key={index} className="product-details--piece flex-row-center flex-wrap">
                      <div className="flex-row-center mint-green-bg shadow-2px white product-details--piece--size font-bold size-20px">
                        {piece.size}
                      </div>
                      <div className="white-bg font-bold gray shadow-5px product-details--piece--info flex-row-between">
                        {translate.available}: {piece.quantity}
                      </div>
                      <div style={{ backgroundColor: piece.color.hexCode }} className="shadow-5px product-details--piece--color shadow-2px flex-row-between" />
                    </div>
                  ))}
                </div>
              </GreenCard>
            </div>
          </div>

          <div className="full-width flex-row-center">
            <GreenCard title={translate.reviews}>
              <PerfectScrollbar className="product-details--scroll--cont full-width flex-col-top-start">
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
