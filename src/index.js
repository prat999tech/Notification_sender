/*
import dotenv from 'dotenv';
dotenv.config({ path: './env' });

// Import the database connection function
import connectDB from "./db/index_db.js";
connectDB().then(()=>{
     import('./app.js')
            .then(({ app }) => { // Use dynamic import and destructure 'app'
                // Start the Express application server
                app.listen(process.env.PORT || 3000, () => {
                    console.log(`⚙️ Server is running on port : ${process.env.PORT || 3000}`);
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
*/

import dotenv from 'dotenv';
// Load environment variables from the .env file
// Ensure the path is correct if your .env file is not in the root directory
// dotenv.config({ path: './env' }); // Use this line if your .env is in a subfolder named 'env'
dotenv.config(); // Use this line if your .env is in the root directory

// Import the database connection function
import connectDB from "./db/index_db.js";

// Connect to the database first
connectDB()
    .then(() => {
        // If database connection is successful, dynamically import and start the Express app
        // Access the default export using .default
        import('./app.js')
            .then((module) => {
                const app = module.default; // <--- Correctly access the default export

                // Start the Express application server
                const port = process.env.PORT || 3000;
                app.listen(port, () => {
                    console.log(`⚙️ Server is running on port : ${port}`);
                });
            })
            .catch((err) => {
                // Catch errors specifically related to the Express app startup
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

// Handle unhandled promise rejections and uncaught exceptions (Good Practice)
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection at: ${promise}, reason: ${err}`);
    // Log the error, potentially close resources, and exit
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    // Log the error, potentially close resources, and exit
    process.exit(1);
});


