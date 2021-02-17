const mailgun = require("mailgun-js");
const validator = require("email-validator");
const sgMail = require('@sendgrid/mail');

//set domain and api for mailgun
const mg_DOMAIN = 'sandboxb843d388466a4098b8701b8637d9455a.mailgun.org';
const mg = mailgun({ apiKey: 'aef9bbddcb8db1db600410e37b89014c-4de08e90-caddef97', domain: mg_DOMAIN });
sgMail.setApiKey('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');

exports.sendmail = async function (req, res) {

    //initialise arrays
    var arr_TO = [];
    var arr_BCC = [];
    var arr_CC = [];

    var data = {
        from: 'anjali.bisht@gmail.com'
    }

    // replace comma and semicolon with space and split input to form array
    if (req.query.TO) { arr_TO = req.query.TO.replace(/[, ;]/g, " ").split(" "); }
    if (req.query.CC) { arr_CC = req.query.CC.replace(/[, ;]/g, " ").split(" "); }
    if (req.query.BCC) { arr_BCC = req.query.BCC.replace(/[, ;]/g, " ").split(" "); }

    // validate email ids passed in input
    arr_TO = await validate_emails(arr_TO);
    arr_CC = await validate_emails(arr_CC);
    arr_BCC = await validate_emails(arr_BCC);

    // if there are no validate email ids set error
    if (arr_TO.length === 0 & arr_CC.length === 0 & arr_BCC.length === 0) {
        res.json({ message: "No valid email ids provided" });
    }
    else {
        // join multiple emails with comma
        if (arr_TO.length > 0) { data.to = arr_TO.join(","); }
        else { res.json({ message: "TO email id must be provided" }); }
        if (arr_CC.length > 0) { data.cc = arr_CC.join(","); }
        if (arr_BCC.length > 0) { data.bcc = arr_BCC.join(","); }

        // set subject and text to space if no subject is provided
        data.subject = (req.query.SUBJECT) ? req.query.SUBJECT : " ";
        data.text = (req.query.TEXT) ? req.query.TEXT : " ";

        //call mailgun api to send message
        mg.messages().send(data, function (err, body) {
            if (err) {
                // if mailgun didnt work try sendGrid
                sgMail.send(data)
                    .then(() => {
                        res.json({ message: "Message has been posted" });
                    })
                    .catch((error) => {
                        //if neither sendgrid nor mailgun worked set error
                        console.error(error)
                        res.json({ message: "Oops...problem sending mail. Please try again later." });
                    })
            }
            else {
                res.json({ message: "Message has been posted" });
            }
        })
    }
    return;
};

//function check each email in input and eliminates any invalid email ids
async function validate_emails(arr_email) {
    var val_email = [];
    arr_email.forEach(function (email) {
        if (validator.validate(email)) {
            val_email.push(email)
        }
    });
    return (val_email);
};

