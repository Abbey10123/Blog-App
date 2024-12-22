const app = require("./app");

require("./db").connectToMongoDB();

const port = 3001;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
