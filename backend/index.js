import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db from "./config/db.js";

db()
  .then(function () {
    const port = process.env.PORT || 4000;
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(function (error) {
    console.log(
      error instanceof Error ? error.message : "Error connecting with mongo"
    );
  });
