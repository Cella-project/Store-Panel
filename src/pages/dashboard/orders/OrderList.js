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

const OrderList = () => {
    const dispatch = useDispatch();
    const orderCards = useSelector(state => state.order.orders);

    useEffect(() => {
        dispatch(orderMutations.setOrder(null));
        dispatch(orderActions.getOrder());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Orders • Admin Panel';
    }, []);

    let cards = [
        { title: 'Total Orders', content: 0, icon: "bi bi-people mint-green" },
        { title: 'Delivered', content: 0, icon: "bi bi-people mint-green" },
        { title: 'Pending', content: 0, icon: "bi bi-people mint-green" },
        { title: 'Cancelled By Customer', content: 0, icon: "bi bi-people mint-green" },
        { title: 'Cancelled By Admin', content: 0, icon: "bi bi-people mint-green" },
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
        content = <p>Found no orders .</p>
    }

    if (orderCards !== null && orderCards.length > 0) {
        const sortedOrder = [...orderCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let filteredOrder = sortedOrder;
        if (searchQuery !== '') {
            if (searchType === 'all') {
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
        if (searchStatus !== '' && searchStatus !== 'all') {
            filteredOrder = filteredOrder.filter(order => {
                return (
                    searchQuery === '' ? order.status === searchStatus :
                        (order.status === searchStatus &&
                            (searchType === 'all' ?
                                (order.name + order.code + order.store.storeName)?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                (searchType.includes('.') ?
                                    order[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery.toLowerCase()) :
                                    order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())

                                )
                            ))
                )
            });
        }

        content = filteredOrder.length === 0 ? 'No results found.' :
            filteredOrder.map((orderCard) => {
                return (
                    <ListsCard key={orderCard._id}>
                        <OrderCard
                            order={orderCard}
                        />
                    </ListsCard>
                )
            })

        cards = [
            { title: 'Total Orders', content: orderCards.length, icon: "bi bi-people mint-green" },
            { title: 'Delivered', content: orderCards.filter(orderCard => orderCard.status === 'Delivered').length, icon: "bi bi-people mint-green" },
            { title: 'Pending', content: orderCards.filter(orderCard => orderCard.status === 'Pending').length, icon: "bi bi-people mint-green" },
            { title: 'Cancelled By Customer', content: orderCards.filter(orderCard => orderCard.status === 'CanceledByCustomer').length, icon: "bi bi-people mint-green" },
            { title: 'Cancelled By Admin', content: orderCards.filter(orderCard => orderCard.status === 'CanceledByAdmin').length, icon: "bi bi-people mint-green" },
        ]
    }

    return (
        <div className="orders full-width" >
            <div className="orders--braud-cramb gray inter size-16px font-bold">
                Order 
            </div>
            <div className="orders--cards">
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