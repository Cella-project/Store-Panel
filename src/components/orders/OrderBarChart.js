import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import GreenCard from '../common/GreenCard';
import 'chart.js/auto';
import './OrderBarChart.scss';
import languages from '../global/languages';
import { useSelector } from 'react-redux';

const OrderBarChart = () => {
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

    // Count the number of orders for each day of the week
    const ordersCountByDay = Array(7).fill(0);
    ordersByDay.forEach(day => {
        const dayIndex = day.getDay();
        ordersCountByDay[dayIndex] += 1;
    });

    // Calculate the orders count for the current week
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentWeek = currentDate.toLocaleDateString('en-US', { year: 'numeric', week: 'numeric' });
    const ordersByWeek = ordersByDay.filter(day => {
        const orderYear = day.getFullYear();
        const orderWeek = day.toLocaleDateString('en-US', { year: 'numeric', week: 'numeric' });
        return orderYear === currentYear && orderWeek === currentWeek;
    });

    // Calculate the orders count for each month
    const ordersCountByMonth = Array(12).fill(0);
    ordersByDay.forEach(day => {
        const monthIndex = day.getMonth();
        ordersCountByMonth[monthIndex] += 1;
    });

    // Configure the chart data and labels
    const [selectedTimeframe, setSelectedTimeframe] = useState('month');

    const handleTimeframeChange = (event) => {
        setSelectedTimeframe(event.target.value);
    };

    const chartData = {
        labels: [], // Initialize the labels array
        datasets: [
            {
                label: translations.numberOfOrders,
                data: [], // Initialize the data array
                backgroundColor: '#70c8b0', // Bar color
            },
        ],
    };

    if (selectedTimeframe === 'day') {
        chartData.labels = ordersByDay.map(day => day.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
        chartData.datasets[0].data = ordersCountByDay;
    } else if (selectedTimeframe === 'week') {
        chartData.labels = [translations.sun, translations.mon, translations.tue, translations.wed, translations.thu, translations.fri, translations.sat];
        chartData.datasets[0].data = [
            ordersByWeek.filter(day => day.getDay() === 0).length,
            ordersByWeek.filter(day => day.getDay() === 1).length,
            ordersByWeek.filter(day => day.getDay() === 2).length,
            ordersByWeek.filter(day => day.getDay() === 3).length,
            ordersByWeek.filter(day => day.getDay() === 4).length,
            ordersByWeek.filter(day => day.getDay() === 5).length,
            ordersByWeek.filter(day => day.getDay() === 6).length,
        ];
    } else if (selectedTimeframe === 'month') {
        chartData.labels =[translations.jan,translations.feb,translations.mar,translations.apr,translations.may,translations.jun,translations.jul,translations.aug,translations.sep,translations.oct,translations.nov,translations.dec]
        chartData.datasets[0].data = ordersCountByMonth;
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
                            value="day"
                            checked={selectedTimeframe === 'day'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.day}
                    </label>
                    <label className='text-shadow gray chart inter'>
                        <input
                            className='mint-green margin-6px-H'
                            type="radio"
                            value="week"
                            checked={selectedTimeframe === 'week'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.week}
                    </label>
                    <label className='text-shadow gray chart inter'>
                        <input
                            className='mint-green margin-6px-H'
                            type="radio"
                            value="month"
                            checked={selectedTimeframe === 'month'}
                            onChange={handleTimeframeChange}
                        />
                        {translations.month}
                    </label>
                </div>
                <Bar data={chartData} options={chartOptions} />
            </GreenCard>
        </div>
    );
};

export default OrderBarChart;