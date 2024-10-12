import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionStatistics.css'; // Import CSS file for styling

const TransactionStatistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSales: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('/api/statistics', { params: { month: selectedMonth } });
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };
        if (selectedMonth) {
            fetchStatistics();
        }
    }, [selectedMonth]);

    return (
        <div className="transaction-statistics">
            <h2>Transaction Statistics for {selectedMonth}</h2>
            <div className="statistic-item">
                <span>Total Sales:</span>
                <span>₹{statistics.totalSales.toLocaleString()}</span>
            </div>
            <div className="statistic-item">
                <span>Total Sold Items:</span>
                <span>{statistics.totalSoldItems}</span>
            </div>
            <div className="statistic-item">
                <span>Total Not Sold Items:</span>
                <span>{statistics.totalNotSoldItems}</span>
            </div>
        </div>
    );
};

export default TransactionStatistics;
