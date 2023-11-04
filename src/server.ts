require("express-async-errors");
import "dotenv/config";
import app from "./app";

const PORT: number = +process.env.PORT! || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
