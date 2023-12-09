const express = require("express");
const cors = require("cors");
const greet = require('./routes/greet');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

// adding routes
app.use('/greet', greet);





//adding some daraja api code
mongoose.connect("mongodb+srv://Admin-Samuel:test1234@cluster0.7fp58pn.mongodb.net/darajaapiv2");
//DARAJA Schema
const DarajaCallbackUrlEndpoint= new mongoose.Schema(
  {
    
    MerchantRequestID: String,
    CheckoutRequestID: String,
    ResultCode: String,
    ResultDesc: String,
    TransactionAmount: String,
    MpesaCode: String,
    TransactionDate: String,
    PhoneNumber: String,
    //      const confirmedPayments = [];
    // const {MerchantRequestID, CheckoutRequestID, ResultCode,ResultDesc, MpesaCode, TransactionDate,PhoneNumber} = req.body;
  }
)
const DarajaCallback = mongoose.model("callbackUrlModel", DarajaCallbackUrlEndpoint)
app.post("/dararajatest", function(req, res){
 //console.log(req.body.Body["stkCallback"])
   const newCallbackDetails = new DarajaCallback({
   // transacDetails: Body,
   MerchantRequestID: req.body.Body.stkCallback.MerchantRequestID,
    CheckoutRequestID: req.body.Body.stkCallback.CheckoutRequestID,
    ResultCode: req.body.Body.stkCallback.ResultCode,
    ResultDesc: req.body.Body.stkCallback.ResultDesc,
    //callbackMetadata
    //TransactionAmount: req.body.Body.stkCallback.CallbackMetadata.item[0].Value,
    // MpesaCode: req.body.Body.stkCallback.CallbackMetadata.item[1].Value,
    // TransactionDate: req.body.Body.stkCallback.CallbackMetadata.item[3].Value,
    // PhoneNumber: req.body.Body.stkCallback.CallbackMetadata.item[4].Value,
  })

  newCallbackDetails.save();
  console.log("saved!")
  console.log(newCallbackDetails)
  res.send(newCallbackDetails)
})
//end of darajaapi code





app.get('/', (req, res) => {
	res.json('Welcome to the API');
});
app.post("/postrequest", function(req, res){
	res.send("Your post request has been received")
})





//port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));