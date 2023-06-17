import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import GreenCard from "../../../components/common/GreenCard";
import OrderInfo from "../../../components/orders/OrderInfo";
import ProductCard from "../../../components/products/ProductCard";
import ListsCard from "../../../components/common/ListsCard";
import { useSelector, useDispatch } from 'react-redux';
import { orderHistoryActions } from "../../../apis/actions";
import { orderHistoryMutations } from "../../../redux/mutations";
import languages from "../../../components/global/languages";

import "./OrderHistoryDetails.scss";
const OrderHistoryDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
    const translate = languages[language]
    const order = useSelector(state => state.orderHistory.orderHistoryData);
    const [expandedPickup, setExpandedPickup] = useState(false)
    const [expandedDrop, setExpandedDrop] = useState(false)

    const handleExpandPick = () => {
        setExpandedPickup(!expandedPickup)
    }

    const handleExpandDrop = () => {
        setExpandedDrop(!expandedDrop)
    }

    useEffect(() => {
        dispatch(orderHistoryMutations.setOrderHistoryData(null));
        dispatch(orderHistoryActions.getOrderHistoryData(params.id));
    }, [dispatch, params.id]);

    order && (document.title = `${order.code} • Store Panel`);

    return (
        <div className="orderHistory-details--container full-width flex-col-left-start2col">
            {order && (<>

                <div className="flex-row-left-start2col orderHistory-details full-width">
                    <div className="full-width orderHistory-details">
                        <OrderInfo order={order} />
                    </div>
                </div>
                <div className="flex-row-left-start2col orderHistory-details--control full-width">
                    <div className="flex-col-center width-80-100">
                        <div className="flex-col-left-start orderHistory-details--card-cont full-width">
                            <div className="flex-col-center full-width">
                                <GreenCard title={translate.products}>
                                    <PerfectScrollbar className="review-scroll--cont full-width">
                                        {order.items
                                            .map((item) => {
                                                return (
                                                    <ListsCard key={item._id} width="full-width">
                                                        <div className="flex-row-left-start full-width">
                                                            <ProductCard
                                                                productCard={item.product}
                                                                size={item.size}
                                                                color={item.color}
                                                                quantity={item.quantity}
                                                                price={item.unitTotal}
                                                                width="full-width"
                                                            />
                                                        </div>
                                                    </ListsCard>
                                                );
                                            })
                                        }
                                    </PerfectScrollbar>
                                    <Link to={`/Products`} className="pointer lists-card--link">
                                        <i className={`flex-row-right-start ${language==='ar'?'bi bi-arrow-left':"bi bi-arrow-right"}`}></i>
                                    </Link>
                                </GreenCard>
                            </div>
                            <div className="flex-row-top-between2col full-width full-width">
                                <GreenCard title={translate.reviews}>
                                    {/* <PerfectScrollbar className="review-scroll--cont full-width"></PerfectScrollbar> */}
                                    <Link to={`/Reviews`} className="pointer lists-card--link">
                                        <i className={`flex-row-right-start ${language==='ar'?'bi bi-arrow-left':"bi bi-arrow-right"}`}></i>
                                    </Link>
                                </GreenCard>
                                <GreenCard title={translate.vouchers}>
                                    {/* {
                                    voucherCards.map((voucher) => {
                                        return (
                                            voucher.id === orderHistory.voucher &&
                                            <VoucherCard type={voucher.type}
                                            status={voucher.status}
                                            store={voucher.store}
                                            value={voucher.value}
                                            code={voucher.code}
                                            img={voucher.img} />
                                            );
                                        })
                                    }
                                    <Link to={`/Vouchers`} className="pointer lists-card--link">
                                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                                </Link> */}
                                </GreenCard>
                            </div>
                        </div>

                    </div>
                    <div className="flex-col-top-start orderHistory-details--card-cont width-20-100">
                        <GreenCard title={translate.delivery}>
                            {order.driver.state === 'NotAssigned' ? (
                                <div className="gray inter size-20px font-bold flex-row-center">{translate.notAssigned}</div>
                            ) : (
                                <div className="gray inter size-20px font-bold flex-row-center">{translate.assigned}</div>
                            )}
                        </GreenCard>
                        <GreenCard title={translate.pickupLocation}>
                            {order && order.pickupLocation && (
                                <div>
                                    <div className="pointer flex-col-right-start" onClick={handleExpandPick}>
                                        <div className="orderHistory-details--content-container shadow-2px flex-col-left-start radius-15px margin-8px-V gray inter full-width">
                                            <div className="text-shadow full-width flex-row-center">{order.pickupLocation.addressTitle}</div>
                                            {expandedPickup && (
                                                <div className="flex-col-left-start gray mint-green full-width margin-8px-V">
                                                    <div className="margin-6px-V flex-row-left-start">{translate.addressType}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.addressType}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.city}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.city}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.district}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.district}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.street}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.street}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.building}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.building}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.floor}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.floor}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.flat}:
                                                        <div className='gray margin-12px-H'>{order.pickupLocation.flat}</div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-top-start full-width">{translate.phoneNumbers}:
                                                        <div className="margin-12px-H flex-col-left-start gray">
                                                            {order.pickupLocation.phoneNums.map((phone) => (
                                                                <div key={phone._id}>
                                                                    {phone.type}: {phone.phoneNum}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-row-right-start margin-2px-V size-14px font-bold">
                                        <i className={`bi bi-chevron-${expandedPickup ? "up" : "down"} gray`} />
                                    </div>
                                </div>
                            )}


                        </GreenCard>
                        <GreenCard title={translate.dropLocation}>
                            {order && order.dropLocation && (
                                <div>
                                    <div className="pointer flex-col-right-start" onClick={() => handleExpandDrop()}>
                                        <div className="orderHistory-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                                            <div className="text-shadow">{order.dropLocation.addressTitle}</div>
                                            {expandedDrop && (
                                                <div className="flex-col-left-start gray mint-green full-width margin-8px-V">
                                                    <div className="margin-6px-V flex-row-left-start">{translate.addressType}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.addressType}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.city}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.city}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.district}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.district}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.street}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.street}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.building}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.building}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.floor}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.floor}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-left-start">{translate.flat}:
                                                        <div className='gray margin-12px-H'>
                                                            {order.dropLocation.flat}
                                                        </div>
                                                    </div>
                                                    <div className="margin-6px-V flex-row-top-start full-width">{translate.phoneNumbers}:
                                                        <div className="margin-12px-H flex-col-left-start gray">
                                                            {order.dropLocation.phoneNums.map((phone) => (
                                                                <div key={phone._id}>
                                                                    {phone.type}: {phone.phoneNum}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-row-right-start margin-2px-V size-14px font-bold">
                                        <i
                                            className={`bi bi-chevron-${expandedDrop ? "up" : "down"} gray`}
                                        />
                                    </div>
                                </div>
                            )}

                        </GreenCard>
                    </div>
                </div>
            </>)}
        </div>
    );
};

export default OrderHistoryDetails;
