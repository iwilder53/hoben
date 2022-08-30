const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", express.static(process.cwd()));

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: '465',
  secure: true, // true for 465, false for other ports
    auth: {
  //  user: process.env.EMAIL,
 
  //  pass: process.env.PASS,
    user: "admin@hobeninfotech.com",
    pass:  "ghCsfuUeaHsQ"
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
    var basicInfo =  `Hello Hoben InfoTech ! I am ${data.name} \n My Email is :  ${data.email}\n Mobile : ${data.Mobile}\n  Message : ${data.message}`; 
    const mail = {
      sender:'admin@hobeninfotech.com', //`${data.name} <${data.email}>`,
     // to: process.env.EMAIL, // receiver email,
      to:"hobeninfotech@gmail.com ",
     subject: data.subject,
     // text: `${data.name} <${data.email}> \n${data.message}`,
    text: `${basicInfo} `//${data.mesasage}` 
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