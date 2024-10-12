import React, { useState } from 'react';
import TransactionTable from './components.js/TransactionTable';
import TransactionStatistics from './components.js/TransactionStatistics';
import TransactionChart from './components.js/TransactionChart';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchText, setSearchText] = useState('');

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <h1>Transaction Dashboard</h1>
            <select onChange={handleMonthChange} value={selectedMonth}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <input
                type="text"
                placeholder="Search transactions..."
                value={searchText}
                onChange={handleSearchChange}
            />
            <TransactionStatistics selectedMonth={selectedMonth} />
            <TransactionTable selectedMonth={selectedMonth} searchText={searchText} />
            <TransactionChart selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;