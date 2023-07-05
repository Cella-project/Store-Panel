import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { specialityActions } from "../../apis/actions";
// import { specialityMutations } from "../../redux/mutations";
import languages from "../global/languages";
import "./Search.scss";

const Search = ({ width, onSearch, page }) => {
  const [filterList, setFilterList] = useState(false);
  const language = useSelector((state) => state.language.language);
  const translate = languages[language];

  const inputRef = useRef(null);
  const query = useRef('');
  const searchType = useRef('all');
  const filter = useRef({
    status: '',
  });

  const filterClickHandler = (isFilterList) => {
    if (isFilterList === true) {
      query.current = '';
      searchType.current = 'all';
      filter.current.status = '';
    }
    handleSearch();
    setFilterList(!isFilterList)
  }

  const handleSearch = () => {
    onSearch(query.current, searchType.current, filter.current);
    inputRef.current.focus();
  };

  return (
    <div className={`flex-col-center ${width}`}>
      <div className={`search-bar white-bg flex-row-between pt-sans shadow-5px full-width gray radius-20px`} >
        <i className="bi bi-search search-bar--icon size-18px margin-4px-H" />
        <input
          className="search-bar--input size-20px full-width gray"
          type="text"
          placeholder={translate.typeToSearch}
          value={query.current}
          onChange={(e) => {
            query.current = e.target.value;
            handleSearch();
          }}
          autoFocus
          ref={inputRef}
        />
        {query.current !== '' &&
          <i className='bi bi-x search-bar--icon pointer red size-26px margin-8px-H' onClick={filterClickHandler.bind(null, true)} />
        }
        <i className="bi bi-sliders search-bar--icon pointer size-18px" onClick={filterClickHandler.bind(null, filterList)} />
      </div>
      {(filterList && page) &&
        <form noValidate className="flex-row-top-between2col search-bar--filter mint-green-bg shadow-5px full-width gray inter">
          {(page === 'Products' || page === 'OrdersHistory' || page === 'Orders') &&
            <div className="flex-row-top-start size-16px margin-8px-V width-50-100">
              {translate.searchBy}:
              <div className="flex-col-left-start search-bar--filter--options">
                <div className="flex-row-left-start">
                  <input type="radio" name="search-type" className="margin-12px-H pointer" id="all"
                    value="all" defaultChecked
                    onChange={() => {
                      searchType.current = 'all';
                      handleSearch();
                    }
                    }
                  />
                  <label className="pointer" htmlFor="all">{translate.all}</label>
                </div>
                <div className="flex-row-left-start">
                  <input type="radio" name="search-type" className="margin-12px-H pointer" id="name"
                    value='name'
                    onChange={() => {
                      searchType.current = 
                        (page === 'Products') ? 'name' :
                          (page === 'OrdersHistory' || page === 'Orders') ? 'customer.name' : 'all';
                      handleSearch();
                    }
                    }
                  />
                  <label className="pointer" htmlFor="name">
                    {page === 'OrdersHistory' && translate.customerName}
                    {page === 'Products' && translate.name}
                    {page === 'Orders' && translate.customerName}
                  </label>
                </div>
                {page === 'Products' &&
                  <>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-type" className="margin-12px-H pointer" id="category"
                        value="category"
                        onChange={() => {
                          searchType.current = 'subCategory.title';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="category">{translate.category}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-type" className="margin-12px-H pointer" id="material"
                        value="material"
                        onChange={() => {
                          searchType.current = 'material';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="material">{translate.material}</label>
                    </div>
                  </>
                }
                {(page === 'OrdersHistory' || page === 'Orders') &&
                  <div className="flex-row-left-start">
                    <input type="radio" name="search-type" className="margin-12px-H pointer" id="code"
                      value="code"
                      onChange={() => {
                        searchType.current = 'code';
                        handleSearch();
                      }
                      }
                    />
                    <label className="pointer" htmlFor="code">{translate.orderCode}</label>
                  </div>
                }
              </div>
            </div>
          }

          {(page === 'Products' || page === 'OrdersHistory' || page === 'Orders') &&
            <div className="flex-col-left-start size-16px margin-8px-V width-50-100">
              {( page === 'Products' ) &&
                <div className="flex-row-top-start">
                  {translate.status}:
                  <div className="flex-row-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="all-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-status">{translate.all}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="active"
                        value="active"
                        onChange={() => {
                          filter.current.status = 'Active';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="active">{translate.active}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-status" className="margin-12px-H pointer" id="inactive"
                        value="inactive"
                        onChange={() => {
                          filter.current.status = 'InActive';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="inactive">{translate.inactive}</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'OrdersHistory' &&
                <div className="flex-row-top-start">
                  {translate.status}:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="all-orders-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-orders-status">{translate.all}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByAdmin"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByAdmin';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByAdmin">{translate.cancelledByAdmin}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByCustomer"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByCustomer';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByCustomer">{translate.cancelledByCustomer}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="cancelledByStore"
                        value="cancelled"
                        onChange={() => {
                          filter.current.status = 'CanceledByStore';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="cancelledByStore">{translate.cancelledByStore}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="returned"
                        value="returned"
                        onChange={() => {
                          filter.current.status = 'Returned';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="returned">{translate.returned}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="delivered"
                        value="delivered"
                        onChange={() => {
                          filter.current.status = 'Delivered';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="delivered">{translate.delivered}</label>
                    </div>
                  </div>
                </div>
              }
              {page === 'Orders' &&
                <div className="flex-row-top-start">
                  {translate.status}:
                  <div className="flex-col-left-start2col search-bar--filter--options">
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="all-orders-status"
                        value="all" defaultChecked
                        onChange={() => {
                          filter.current.status = 'all';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="all-orders-status">{translate.all}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="approved"
                        value="approved"
                        onChange={() => {
                          filter.current.status = 'Approved';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="approved">{translate.approved}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="pending"
                        value="pending"
                        onChange={() => {
                          filter.current.status = 'Pending';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="pending">{translate.pending}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="ready"
                        value="ready"
                        onChange={() => {
                          filter.current.status = 'Ready';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="ready">{translate.readyForPickup}</label>
                    </div>
                    <div className="flex-row-left-start">
                      <input type="radio" name="search-orders-status" className="margin-12px-H pointer" id="picked"
                        value="picked"
                        onChange={() => {
                          filter.current.status = 'Picked';
                          handleSearch();
                        }
                        }
                      />
                      <label className="pointer" htmlFor="ready">{translate.picked}</label>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </form>
      }
    </div>
  );
};

export default Search;
