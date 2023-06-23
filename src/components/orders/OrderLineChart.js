import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import GreenCard from '../common/GreenCard';
import 'chart.js/auto';
import languages from '../global/languages';
import { useSelector } from 'react-redux';

const OrderLineChart = () => {
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    const orders = useSelector(state => state.order.orders); // Get the orders from the Redux store
    const ordersHistory = useSelector(state => state.orderHistory.ordersHistory); // Get the orders from the Redux store
    let allOrders = [];
    if (orders !== null && ordersHistory !== null) {
        allOrders = orders.concat(ordersHistory);
    }

    // Extract the date (day) from the createdAt attribute of each order
    const ordersByDay = allOrders.map(order => new Date(order.createdAt));

    // Calculate the orders count for the last 7 days
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds to compare dates accurately
    currentDate.setDate(currentDate.getDate() - 6); // Subtract 6 days to get the starting date
    const ordersByLast7Days = ordersByDay.filter(day => day >= currentDate);

    // Calculate the orders count for the last 30 days
    const currentMonth = currentDate.getMonth();
    currentDate.setDate(currentDate.getDate() - 23); // Subtract 23 days to get the starting date
    const ordersByLast30Days = ordersByDay.filter(day => day >= currentDate && day.getMonth() === currentMonth);

    // Configure the chart data and labels
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
                data: [], // Initialize the data array
                borderColor: '#70c8b0', // Line color
                fill: false, // Disable area fill
            },
        ],
    };

    if (selectedTimeframe === 'last7days') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // Subtract 6 days to get the starting date
        const datesInRange = getDatesInRange(startDate, new Date());
        lineChartData.labels = datesInRange.map(date => date.toLocaleDateString('en-US'));
        lineChartData.datasets[0].data = getOrdersCountByDate(ordersByLast7Days, datesInRange);
    } else if (selectedTimeframe === 'last30days') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 29); // Subtract 29 days to get the starting date
        const datesInRange = getDatesInRange(startDate, new Date());
        lineChartData.labels = datesInRange.map(date => date.toLocaleDateString('en-US'));
        lineChartData.datasets[0].data = getOrdersCountByDate(ordersByLast30Days, datesInRange);
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
                    <label className='text-shadow mint-green inter'>
                        <input
                            className='mint-green margin-6px-H'
                            type="radio"
                            value="last7days"
                            checked={selectedTimeframe === 'last7days'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.last7days}
                    </label>
                    <label className='text-shadow mint-green inter'>
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
