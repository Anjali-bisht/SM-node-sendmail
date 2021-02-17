var expect = require("chai").expect;
var request = require("request");

describe("Send mail", function () {

    describe("send to single to no cc and bcc", function () {

        var url = "http://localhost:3000/mail?TO=anjali.bisht@gmail.com&TEXT=different test case with cc&SUBJECT=this is subject line";

        it("success - 100", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("Message has been posted");
                done()
            });
        });

    });

    describe("No valid email id", function (done) {
        var url = "http://localhost:3000/mail?TO=a123.com&CC=rte@rte&TEXT=no valid email id&SUBJECT=this is subject line";

        it("failure - 101", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("No valid email ids provided");
                done()
            });
        });
    });

    describe("send to, cc, bcc", function (done) {
        var url = "http://localhost:3000/mail?TO=anjali.bisht@gmail.com&CC=anjali.bisht@icloud.com&BCC=abc@gmail.com&TEXT=test case with to cc bcc&SUBJECT=subject 1";
        it("success - 102", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("Message has been posted");
                done()
            });
        });
    });

    describe("send with no text and subject", function () {
        var url = "http://localhost:3000/mail?TO=anjali.bisht@gmail.com&CC=anjali.bisht@icloud.com&BCC=abc@gmail.com";
        it("success - 103", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("Message has been posted");
                done()
            });
        });
    });

    describe("send to multiple recipients in TO", function () {
        var url = "http://localhost:3000/mail?TO=anjali.bisht@gmail.com anjali.bisht@icloud.com abc@gmail.com&TEXT=many emails&SUBJECT=subject or no subject";
        it("success - 104", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("Message has been posted");
                done()
            });
        });
    });

    describe("send to empty CC BCC SUBJECT and TEXT", function () {
        var url = "http://localhost:3000/mail?TO=anjali.bisht@gmail.com&BCC=&CC=&TEXT=&SUBJECT=";
        it("success - 105", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("Message has been posted");
                done()
            });
        });
    });

    describe("send empty TO CC BCC SUBJECT and TEXT", function () {
        var url = "http://localhost:3000/mail?TO=&BCC=&CC=&TEXT=&SUBJECT=";
        it("failure - 106", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("No valid email ids provided");
                done()
            });
        });
    });

    describe("send to CC with SUBJECT and TEXT", function () {
        var url = "http://localhost:3000/mail?CC=anjali.bisht@icloud.com&TEXT=NO to in this&SUBJECT=subject is here";
        it("failure - 107", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).message).to.equal("TO email id must be provided");
                done()
            });
        });
    });

});