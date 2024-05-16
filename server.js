const express = require("express");
const bodyParser = require("body-parser");
const loanRoutes = require("./routes/loanRoutes");
const app = express();

app.use(bodyParser.json());

app.use("/api", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
