const express = require("express");
const cors = require("cors");
const greet = require('./routes/greet');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

// adding routes
app.use('/greet', greet);

app.get('/', (req, res) => {
	res.json('Welcome to the API');
});
app.post("/postrequest", function(req, res){
	res.send("Your post request has been received")
})



//port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));