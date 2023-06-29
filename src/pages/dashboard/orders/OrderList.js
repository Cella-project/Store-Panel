import React, { useEffect, useState } from 'react';

import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import './OrderList.scss';
import OrderCard from '../../../components/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../apis/actions';
import { orderMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';
import languages from '../../../components/global/languages';

const OrderList = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const orderCards = useSelector(state => state.order.orders);
    const storeData = useSelector(state => state.auth.userData);
    useEffect(() => {
        dispatch(orderMutations.setOrder(null));
        dispatch(orderActions.getOrder(storeData._id));
    }, [dispatch, storeData._id]);

    useEffect(() => {
        document.title = 'Orders • Store panel';
    }, []);

    let cards = [
        { title: translate.totalOrders, content: 0, icon: "bi bi-people orange" },
        { title: translate.pending, content: 0, icon: "bi bi-people orange" },
        { title: translate.approved, content: 0, icon: "bi bi-people orange" },
        { title: translate.readyForPickup, content: 0, icon: "bi bi-people orange" },
        { title: translate.picked, content: 0, icon: "bi bi-people orange" },
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

    if (orderCards !== null && orderCards.length === 0) {
        content = <p>{translate.foundNoOrders}</p>
    }

    if (orderCards !== null && orderCards.length > 0) {
        const sortedOrder = [...orderCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let filteredOrder = sortedOrder;
        if (searchQuery !== '') {
            if (searchType === translate.all) {
                filteredOrder = filteredOrder.filter(order =>
                    (order.customer.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                filteredOrder = filteredOrder.filter(order => {
                    if (searchType.includes('.')) {
                        return order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase())
                    } else return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
                });
            }
        }
        if (searchStatus !== '' && searchStatus !== translate.all) {
            filteredOrder = filteredOrder.filter(order => {
                return (
                    searchQuery === '' ? order.status === searchStatus :
                        (order.status === searchStatus &&
                            (searchType === translate.all ?
                                (order.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                (searchType.includes('.') ?
                                    order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                    order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())

                                )
                            )
                        )
                )
            });
        }

        content = filteredOrder.length === 0 ? translate.noResultFound :
            filteredOrder.map((orderCard) => {
                return (
                    <ListsCard key={orderCard._id} >
                        <OrderCard
                            order={orderCard}
                        />
                    </ListsCard>
                )
            })

        cards = [
            { title: translate.totalOrders, content: orderCards.length, icon: "bi bi-people orange" },
            { title: translate.pending, content: orderCards.filter(orderCard => orderCard.status === 'Pending').length, icon: "bi bi-people orange" },
            { title: translate.approved, content: orderCards.filter(orderCard => orderCard.status === 'Approved').length, icon: "bi bi-people orange" },
            { title: translate.readyForPickup, content: orderCards.filter(orderCard => orderCard.status === 'Ready').length, icon: "bi bi-people orange" },
            { title: translate.picked, content: orderCards.filter(orderCard => orderCard.status === 'Picked').length, icon: "bi bi-people orange" },
        ]
    }

    return (
        <div className="orders full-width" >
            <div className="orders--braud-cramb gray inter size-16px font-bold">
                {translate.orders}
            </div>
            <div className={`orders--cards${language === 'ar' ? '-arabic' : ''}`}>
                {
                    cards.map((card, index) => {
                        return (
                            <GreenCard title={card.title} key={index}>
                                <div className="full-width flex-row-center">
                                    <i className='bi bi-receipt mint-green size-28px'></i>
                                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                                </div>
                            </GreenCard>
                        );
                    })
                }
            </div>

            <div className='flex-row-left-start'>
                <Search width={'width-90-100'} page={'Orders'} onSearch={handleSearch} />
            </div>

            <div className='flex-col-left-start inter gray'>
                {content}
            </div>
        </div>
    )
}

export default OrderList;