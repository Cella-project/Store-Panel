import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import GreenCard from '../common/GreenCard';
import 'chart.js/auto';
import languages from '../global/languages';
import { useSelector } from 'react-redux';

const OrderLineChart = () => {
    const language = useSelector(state => state.language.language);
    const mode = useSelector(state => state.theme.mode);
    const translations = languages[language];
    const orders = useSelector(state => state.order.orders); // Get the orders from the Redux store
    const ordersHistory = useSelector(state => state.orderHistory.ordersHistory); // Get the order history from the Redux store

    const ordersByDay = orders ? orders.map(order => new Date(order.createdAt)) : [];
    const ordersHistoryByDay = ordersHistory ? ordersHistory.map(order => new Date(order.createdAt)) : [];

    const [selectedTimeframe, setSelectedTimeframe] = useState('last7days');

    const handleTimeframeChange = (event) => {
        setSelectedTimeframe(event.target.value);
    };

    const getDatesInRange = (startDate, endDate) => {
        const dates = [];
        const current = new Date(startDate);
        while (current <= endDate) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    const getOrdersCountByDate = (orders, dates) => {
        return dates.map(date => {
            const matchingOrders = orders.filter(order => {
                const orderDate = new Date(order);
                return orderDate.toDateString() === date.toDateString();
            });
            return matchingOrders.length;
        });
    };

    const lineChartData = {
        labels: [], // Initialize the labels array
        datasets: [
            {
                label: translations.numberOfOrders,
                data: [], // Initialize the data array for orders
                borderColor: '#70c8b0', // Line color
                fill: false, // Disable area fill
            },
            {
                label: translations.numberOfOrderHistory,
                data: [], // Initialize the data array for order history
                borderColor:'#163a4a', // Line color
                fill: false, // Disable area fill
            },
        ],
    };

    if (selectedTimeframe === 'last7days') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // Subtract 6 days to get the starting date
        const datesInRange = getDatesInRange(startDate, new Date());
        lineChartData.labels = datesInRange.map(date => date.toLocaleDateString('en-US'));
        lineChartData.datasets[0].data = getOrdersCountByDate(ordersByDay, datesInRange);
        lineChartData.datasets[1].data = getOrdersCountByDate(ordersHistoryByDay, datesInRange);
    } else if (selectedTimeframe === 'last30days') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 29); // Subtract 29 days to get the starting date
        const datesInRange = getDatesInRange(startDate, new Date());
        lineChartData.labels = datesInRange.map(date => date.toLocaleDateString('en-US'));
        lineChartData.datasets[0].data = getOrdersCountByDate(ordersByDay, datesInRange);
        lineChartData.datasets[1].data = getOrdersCountByDate(ordersHistoryByDay, datesInRange);
    }

    // Configure the chart options
    const chartOptions = {
        scales: {
            y: {
                type: 'linear', // Ensure the scale type is set to 'linear'
                beginAtZero: true,
                maxTicksLimit: 5, // Limit the number of Y-axis ticks
                precision: 0, // Display whole numbers for Y-axis
            },
        },
    };

    return (
        <div className="full-width flex-row-top-between2col">
            <GreenCard title={translations.orderChart}>
                <div className='flex-row-between2col full-width'>
                    <label className='text-shadow gray chart inter'>
                        <input
                            className='mint-green margin-6px-H'
                            type="radio"
                            value="last7days"
                            checked={selectedTimeframe === 'last7days'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.last7days}
                    </label>
                    <label className='text-shadow gray chart inter'>
                        <input
                            className='mint-green margin-6px-H'
                            type="radio"
                            value="last30days"
                            checked={selectedTimeframe === 'last30days'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.last30days}
                    </label>
                </div>
                <Line data={lineChartData} options={chartOptions} />
            </GreenCard>
        </div>
    );
};

export default OrderLineChart;
