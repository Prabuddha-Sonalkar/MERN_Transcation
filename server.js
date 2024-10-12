// server.js
const express = require('express');
const cors = require('cors');
const { Transaction } = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Initialize database (run this once)
// seedDatabase();

// API to list all transactions with search and pagination
app.get('/api/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    const query = {
        dateOfSale: { $regex: `^.*-${month}-.*$` }, // Match month regardless of year
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search } }
        ]
    };

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));

    const total = await Transaction.countDocuments(query);
    
    res.json({
        transactions,
        total,
        totalPages: Math.ceil(total / perPage),
        currentPage: Number(page)
    });
});

// API for statistics
app.get('/api/statistics', async (req, res) => {
    const { month } = req.query;

    const totalSales = await Transaction.aggregate([
        {
            $match: { dateOfSale: { $regex: `^.*-${month}-.*$` } }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$price" },
                totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
                totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } }
            }
        }
    ]);

    res.json(totalSales[0]);
});

// API for bar chart data
app.get('/api/bar-chart', async (req, res) => {
    const { month } = req.query;

    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(priceRanges.map(async range => {
        const count = await Transaction.countDocuments({
            price: { $gte: range.min, $lte: range.max },
            dateOfSale: { $regex: `^.*-${month}-.*$` }
        });
        return { range: `${range.min}-${range.max}`, count };
    }));

    res.json(barChartData);
});

// API for pie chart data
app.get('/api/pie-chart', async (req, res) => {
    const { month } = req.query;

    const pieChartData = await Transaction.aggregate([
        {
            $match: { dateOfSale: { $regex: `^.*-${month}-.*$` } }
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]);

    res.json(pieChartData);
});

// API for combined data
app.get('/api/combined', async (req, res) => {
    const { month } = req.query;

    const statistics = await fetchStatistics(month);
    const barChart = await fetchBarChart(month);
    const pieChart = await fetchPieChart(month);

    res.json({
        statistics,
        barChart,
        pieChart
    });
});

const fetchStatistics = async (month) => {
    // fetch logic here
};

const fetchBarChart = async (month) => {
    // fetch logic here
};

const fetchPieChart = async (month) => {
    // fetch logic here
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
