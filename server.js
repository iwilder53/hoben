const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", express.static(process.cwd()));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  //  user: process.env.EMAIL,
 
  //  pass: process.env.PASS,
    user: "yashbgdi@gmail.com",
    pass:  "clkxawpreglhtxkw"
},
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    var basicInfo =  `Hello team Hoben ! I am ${data.name}  ${data.email}\n Email : ${data.subject}\n  Mobile : ${data.message}`; 
    const mail = {
      sender: `${data.name} <${data.email}>`,
     // to: process.env.EMAIL, // receiver email,
      to:"yashbgdi@gmail.com",
     subject: data.subject,
     // text: `${data.name} <${data.email}> \n${data.message}`,
    text: `${basicInfo} ${data.mesasage}` 
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("OK");
      }
    });
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});