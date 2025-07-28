import express from 'express';
import cors from 'cors';
import "dotenv/config";
import ConnectDb from './config/db.js';
import dataRoutes from './routes/dataRoutes.js';

const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,            
}));

app.use(express.json());


await ConnectDb();


app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.send("Blackcoffer API working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
