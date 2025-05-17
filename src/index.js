import dotenv from 'dotenv';
dotenv.config({ path: './env' });

// Import the database connection function
import connectDB from '../db/index_db.js';
connectDB().then(()=>{
     import('./app.js')
            .then(({ app }) => { // Use dynamic import and destructure 'app'
                // Start the Express application server
                app.listen(process.env.PORT || 3000, () => {
                    console.log(`⚙️ Server is running on port : ${process.env.PORT || 8000}`);
                });
            })
            .catch((err) => {
                console.error("Express App startup failed:", err);
                // Exit the process if the app fails to start after DB connection
                process.exit(1);
            });
    })
    // If the database connection fails, log the error and exit the process
    .catch((error) => {
        console.log("MongoDB connection FAILED !!!", error);
        process.exit(1); // Exit the process on database connection failure
});

