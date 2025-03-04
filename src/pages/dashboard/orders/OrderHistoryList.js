import React, { useEffect, useState } from 'react';

import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import './OrderHistoryList.scss';
import OrderCard from '../../../components/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistoryActions } from '../../../apis/actions';
import { orderHistoryMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import languages from '../../../components/global/languages';

const OrderHistoryList = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const orderHistoryCards = useSelector(state => state.orderHistory.ordersHistory);
    const storeData = useSelector(state => state.auth.userData);
    const mode = useSelector(state => state.theme.mode);

    useEffect(() => {
        dispatch(orderHistoryMutations.setOrderHistory(null));
        dispatch(orderHistoryActions.getOrderHistory(storeData._id));
    }, [dispatch, storeData._id]);

    useEffect(() => {
        document.title = 'OrdersHistory • Store panel';
    }, []);

    let cards = [
        { title: translate.totalOrders, content: 0, icon: "bi bi-people mint-green" },
        { title: translate.cancelled, content: 0, icon: "bi bi-people mint-green" },
        { title: translate.returned, content: 0, icon: "bi bi-people mint-green" },
        { title: translate.delivered, content: 0, icon: "bi bi-people mint-green" },
    ]

    let content = <Loading />;

    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleSearch = (query, type, filter) => {
        setSearchQuery(query);
        setSearchType(type);
        setSearchStatus(filter.status);
    };

    if (orderHistoryCards !== null && orderHistoryCards.length === 0) {
        content = <p>{translate.foundNoOrders}</p>
    }

    if (orderHistoryCards !== null && orderHistoryCards.length > 0) {
        const sortedOrderHistory = [...orderHistoryCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let filteredOrderHistory = sortedOrderHistory;
        if (searchQuery !== '') {
            if (searchType === translate.all) {
                filteredOrderHistory = filteredOrderHistory.filter(order =>
                    (order.customer.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                filteredOrderHistory = filteredOrderHistory.filter(order => {
                    if (searchType.includes('.')) {
                        return order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase())
                    } else return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
                });
            }
        }
        if (searchStatus !== '' && searchStatus !== translate.all) {
            filteredOrderHistory = filteredOrderHistory.filter(order => {
                return (
                    searchQuery === '' ? order.status === searchStatus :
                        (order.status === searchStatus &&
                            (searchType === translate.all ?
                                (order.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                (searchType.includes('.') ?
                                    order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                    order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())

                                )
                            ))
                )
            });
        }

        content = filteredOrderHistory.length === 0 ? translate.noResultFound :
            filteredOrderHistory.map((orderHistoryCard) => {
                return (
                    <ListsCard key={orderHistoryCard._id} >
                        <OrderCard type={'history'}
                            order={orderHistoryCard}
                        />
                    </ListsCard>
                )
            })

        cards = [
            { title: translate.totalOrders, content: orderHistoryCards.length, icon: "bi bi-people mint-green" },
            { title: translate.cancelled, content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'CanceledByStore' || orderHistoryCard.status === 'CanceledByAdmin' || orderHistoryCard.status === 'CanceledByCustomer').length, icon: "bi bi-people mint-green" },
            { title: translate.returned, content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'Returned').length, icon: "bi bi-people mint-green" },
            { title: translate.delivered, content: orderHistoryCards.filter(orderHistoryCard => orderHistoryCard.status === 'Delivered').length, icon: "bi bi-people mint-green" },
        ]
    }

    return (
        <div className="orderHistorys full-width" >
            <div className="orderHistorys--braud-cramb gray inter size-16px font-bold">
                {translate.orderHistory}
            </div>
            <div className={`orderHistorys--cards${language === 'ar' ? '-arabic' : ''}`}>
                {
                    cards.map((card, index) => {
                        return (
                            <GreenCard title={card.title} key={index}>
                                <div className="full-width flex-row-center">
                                    <i className={`bi bi-receipt ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-28px`}></i>
                                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                                </div>
                            </GreenCard>
                        );
                    })
                }
            </div>

            <div className='flex-row-left-start'>
                <Search width={'width-90-100'} page={'OrdersHistory'} onSearch={handleSearch} />
            </div>

            <div className='flex-col-left-start inter gray'>
                {content}
            </div>
        </div>
    )
}

export default OrderHistoryList;