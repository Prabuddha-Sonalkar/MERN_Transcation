import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TransactionChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await axios.get('/api/bar-chart', { params: { month: selectedMonth } });
            setChartData(response.data);
        };
        fetchChartData();
    }, [selectedMonth]);

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priceRange" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="numberOfItems" fill="#8884d8" />
        </BarChart>
    );
};

export default TransactionChart;
