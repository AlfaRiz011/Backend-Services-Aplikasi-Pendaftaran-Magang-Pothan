const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const { connectDB, syncDB } = require('./database/Database');
const authenticateToken = require('./middlewares/authMiddlewares');

const  authRoutes = require('./router/Auth');
const  userRoutes  = require('./router/User');
const  jobRoutes  = require('./router/Job');
const  documentRoutes  = require('./router/Document');

dotenv.config();
const app = express();

app.use(express.json());
const startServer = async () => {
    try {
        await connectDB();   
        await syncDB()

        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use('/api/auth', authRoutes);
        app.use('/api/user', authenticateToken, userRoutes);
        app.use('/api/job', authenticateToken, jobRoutes);
        app.use('/api/document', authenticateToken, documentRoutes);


        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`); 
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
};

startServer();