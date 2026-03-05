require("dotenv").config();

const app = require("./app")
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{  //This starts your HTTP server.
  console.log(`The surver is running on port${PORT}`)
})