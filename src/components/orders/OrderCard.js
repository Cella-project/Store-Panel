import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import languages from '../global/languages';


const OrderCard = ({ order }) => {
    const language = useSelector(state => state.language.language);
    const translate = languages[language]
    return (
        <>
            <Link to={`/ordersHistory/${order._id}`} className='orders--link full-width flex-row-left-start2col'>
                <div className='lists-card--info gray pointer shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-between2col flex-wrap'>
                    <div className='flex-row-left-start margin-2px-V flex-wrap'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.customer}: </span>{order.customer.name}
                    </div>

                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.orderCode}: </span>{order.code}
                    </div>
                    <div className='flex-row-left-start margin-2px-V flex-wrap'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.store}: </span>
                        <i className='bi bi-shop-window orange size-30px margin-4px-H' />{order.store.storeName}
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.date}: </span>{order.createdAt.split("T")[0]}
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.status}: </span>
                        <span className={`${order.status === 'Delivered' ? 'green' : order.status === 'pending' ? 'yellow' : 'red'}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.total}: </span>{order.total} {translate.EGP}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default OrderCard;