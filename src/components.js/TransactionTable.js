import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionTable.css'; // Import CSS file for styling

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState(''); // State to hold selected month
    const [page, setPage] = useState(1); // State for pagination
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const itemsPerPage = 10; // Items to display per page

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`YOUR_API_ENDPOINT/transactions?month=${month}&page=${page}&limit=${itemsPerPage}`);
                setTransactions(response.data.transactions);
                setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // Calculate total pages
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        if (month) {
            fetchTransactions();
        }
    }, [month, page]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setPage(1); // Reset to first page when month changes
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="transaction-table">
            <h2>Transaction Dashboard</h2>
            <div className="filter-container">
                <input 
                    type="text" 
                    placeholder="Search transaction" 
                    onChange={(e) => console.log('Searching...', e.target.value)} 
                />
                <select value={month} onChange={handleMonthChange}>
                    <option value="">Select Month</option>
                    <option value="2024-01">January 2024</option>
                    <option value="2024-02">February 2024</option>
                    <option value="2024-03">March 2024</option>
                    {/* Add more months as needed */}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                            <td>
                                {transaction.image && <img src={transaction.image} alt={transaction.title} className="transaction-image" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <span>Page No: {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TransactionTable;
