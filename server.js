import express from "express";
import bodyParser from "body-parser";
import auth from "./route/auth.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", auth);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
