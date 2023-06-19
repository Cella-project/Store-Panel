import React from 'react';
import { Bar } from 'react-chartjs-2';
import GreenCard from './GreenCard';
import 'chart.js/auto';
import './BarChart.scss';
const BarChart = () => {
    // Sample data for orders
    const ordersByDay = [10, 5, 7, 12, 8, 15, 9];
    const ordersByWeek = [45, 32, 51, 58];
    const ordersByMonth = [120, 90, 150, 110, 135, 100];

    // Configure the chart data
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Labels for X-axis (days)
        datasets: [
            {
                label: 'Orders by Day',
                data: ordersByDay,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
            },
            {
                label: 'Orders by Week',
                data: ordersByWeek,
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
            },
            {
                label: 'Orders by Month',
                data: ordersByMonth,
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bar color
            },
        ],
    };

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
            <GreenCard title="Orders Chart" >
                <Bar data={chartData} options={chartOptions} />
            </GreenCard>
        </div>
    );
};

export default BarChart;
