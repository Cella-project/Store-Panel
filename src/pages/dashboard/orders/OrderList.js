import React, { useEffect } from 'react';

import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import ListsCard from '../../../components/common/ListsCard';
import OrderCard from '../../../components/orders/OrderCard';
import './OrderList.scss';

export const orderCards = [
  {
    id: "1",
    customerName: 'Ziad Tarek',
    orderCode: '#abcdFGH',
    store: 'Dima',
    date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }) + "",
    status: 'green',
    img: '',
    total: 650,
    driver: 'Delivery',
    product: ['1', '2', '4'],
    voucher: '1',
    rate: 3.5,
    PaymentMethod: 'Cash'
  },
  {
    id: "2",
    customerName: 'Mohamed Ashraf Ibrahim',
    orderCode: '#abcdFGH',
    store: 'Open Shop',
    date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }) + "",
    status: 'baby-blue',
    img: '',
    total: 650,
    driver: 'Delivery',
    product: ['1', '2', '4'],
    voucher: '1',
    rate: 3.5
  },
  {
    id: "3",
    customerName: 'Yousef Ebrahim',
    orderCode: '#abcdFGH',
    store: 'Mr & Mrs',
    date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }) + "",
    status: 'yellow',
    img: '',
    total: 650,
    driver: 'Delivery',
    product: ['1', '2', '4'],
    voucher: '1',
    rate: 3.5
  },
  {
    id: "4",
    customerName: 'Abdallah Khaled',
    orderCode: '#abcdFGH',
    store: 'Dima',
    date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }) + "",
    status: 'red',
    img: '',
    total: 650,
    driver: 'Delivery',
    product: ['1', '2', '4'],
    voucher: '1',
    rate: 3.5
  },
  {
    id: "5",
    customerName: 'Ahmed Basiony',
    orderCode: '#abcdFGH',
    store: 'Dima',
    date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }) + "",
    status: 'red',
    img: '',
    total: 650,
    driver: 'Delivery',
    product: ['1', '2', '4'],
    voucher: '1',
    rate: 3.5
  },
];

const OrderList = () => {
  let success = 0;
  let inProgress = 0;
  let cancelled = 0;
  let returned = 0;

  useEffect(() => {
    document.title = 'Orders • Store Panel';
  }, []);

  orderCards.map((card) => {
    if (card.status === 'green') {
      success++;
    }
    if (card.status === 'red') {
      inProgress++;
    }
    if (card.status === 'yellow') {
      cancelled++;
    }
    if (card.status === 'baby-blue') {
      returned++;
    }

    return card;
  });

  const cards = [
    { title: 'Orders', content: orderCards.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") },
    { title: 'Success Orders', content: success },
    { title: 'In Progress Orders', content: inProgress },
    { title: 'Cancelled Orders', content: cancelled },
    { title: 'Returned Orders', content: returned },
  ]

  return (
    <div className="orders full-width" >
      <div className="orders--braud-cramb gray inter size-16px font-bold">
        Orders
      </div>
      <div className="orders--cards">
        {
          cards.map((card, index) => {
            return (
              <OrangeCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className='bi bi-receipt orange size-28px'></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </OrangeCard>
            );
          })
        }
      </div>

      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>

      <div className='flex-col-left-start inter gray'>
        {
          orderCards.map((orderCard) => {
            return (
              <ListsCard>
                <OrderCard
                  img={orderCard.img}
                  id={orderCard.id}
                  status={orderCard.status}
                  customerName={orderCard.customerName}
                  orderCode={orderCard.orderCode}
                  store={orderCard.store}
                  date={orderCard.date}
                  total={orderCard.total}
                />
              </ListsCard>
            )
          })
        }
      </div>
    </div>
  )
}


export default OrderList;