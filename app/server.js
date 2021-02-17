const express = require('express');
const mailcode = require("./mailcode");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/mail', function (req, res) {

    mailcode.sendmail(req, res, function (err) {
        if (err) {
            console.err('Error: ', err);
        }
        else {
            console.log('Email sent!', res);
        }
    });
}); //end of post

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
