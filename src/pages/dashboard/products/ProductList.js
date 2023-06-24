import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ProductCard from '../../../components/products/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../apis/actions';
import { productMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import languages from '../../../components/global/languages';
import './ProductList.scss';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const language = useSelector(state => state.language.language);
  const translate = languages[language];
  const storeData = useSelector(state => state.auth.userData);

  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.title = 'Products • Store Panel';
    dispatch(productMutations.setProducts(null));
    dispatch(productActions.getProducts(storeData._id));
  }, [dispatch, storeData._id]);

  let cards = [
    { title: translate.products, content: 0, icon: "bi bi-box-seam" },
    { title: translate.availableProducts, content: 0, icon: "bi bi-box-seam" },
    { title: translate.unavailableProducts, content: 0, icon: "bi bi-box-seam" },
    { title: translate.deactivatedProducts, content: 0, icon: "bi bi-box-seam" },
  ];

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
  };


  if (products !== null && products.length === 0) {
    content = <p>{translate.foundNoProducts}</p>
  }
  if (products !== null && products.length > 0) {
    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

    let filteredProducts = sortedProducts;
    if (searchQuery !== '') {
      if (searchType === 'all') {
        filteredProducts = filteredProducts.filter(product =>
          (product.title + product.description + product.store.storeName + product.category.title + product.material)?.toLowerCase().includes(searchQuery?.toLowerCase())
        );
      } else if (searchType === 'name') {
        filteredProducts = filteredProducts.filter(product =>
          (product.title + product.description)?.toLowerCase().includes(searchQuery?.toLowerCase()));
      } else {
        filteredProducts = filteredProducts.filter(product => {
          if (searchType.includes('.')) {
            return product[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery?.toLowerCase())
          } else return product[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
        }
        );
      }
    }
    if (searchStatus !== '' && searchStatus !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        return (
          searchQuery === '' ? product.status === searchStatus :
            (product.status === searchStatus &&
              (searchType === 'all' ?
                (product.title + product.description + product.store.storeName + product.category.title + product.material)?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                searchType === 'name' ? (product.title + product.description)?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                  searchType.includes('.') ?
                    product[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                    product[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
              ))
        )
      }
      );
    }

    content = filteredProducts.length === 0 ? translate.noResultFound :
      filteredProducts.map((product) => {
        return (
          <ProductCard
            key={product._id}
            productCard={product}
          />
        );
      });

    const counts = products.reduce((acc, product) => {
      if (product.status === 'Active' && product.avilableQuantity > 0) {
        acc.activeCount++; // Active and has quantity
      } else if (product.status === 'Active' && product.avilableQuantity === 0) {
        acc.outOfStockCount++; // Active but no quantity
      } else if (product.status === 'InActive') {
        acc.inactiveCount++; // Inactive
      }
      return acc;
    }, {
      activeCount: 0,
      outOfStockCount: 0,
      inactiveCount: 0,
    });

    cards = [
      { title: translate.products, content: products.length, icon: "bi bi-box-seam" },
      { title: translate.availableProducts, content: counts.activeCount, icon: "bi bi-box-seam" },
      { title: translate.unavailableProducts, content: counts.outOfStockCount, icon: "bi bi-box-seam" },
      { title: translate.deactivatedProducts, content: counts.inactiveCount, icon: "bi bi-box-seam" },
    ];

  };
  return (
    <div className="products full-width" >
      <div className="products--braud-cramb gray inter size-16px font-bold">
        {translate.products}
      </div>
      <div className={`products--cards${language === 'ar' ? '-arabic' : ''}`}>
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
      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} page={'Products'} onSearch={handleSearch} />
        <Link to={`/store-panel/products/addProduct`} className='pointer flex-row-left-start2col flex-wrap'>
          <div className='add-icon flex-row-center size-34px mint-green-bg radius-circular pointer'>
            <i className={`bi bi-plus-lg ${mode === 'dark-mode' ? 'gray' : 'white'}`} />
          </div>
        </Link>
      </div>
      <div className='products--list-cards flex-col-left-start flex-wrap gray'>
        {content}
      </div>
    </div>
  )
}

export default ProductList;