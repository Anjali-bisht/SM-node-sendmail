SENDMAIL API
------------

Description
-----------
This node js API sends email using SENDMAIL or MAILGUN service. It accepts input of TO, CC , BCC, SUBJECT and TEXT fields. TO, CC and BCC can be arrays of email ids separated by space or comma or semicolon. A minimum of one email id must be provided in TO for the email to be sent.

API runs on express js 

Input
------
API receives input in query string  
- TO      array of email ids separated by space or comma or semicolon (required)
- CC      array of email ids separated by space or comma or semicolon
- BCC     array of email ids separated by space or comma or semicolon
- SUBJECT text string 
- TEXT    text string

OUTPUT
------
Response is sent back for success or error

Success message
---------------
- Message has been posted

Errors sent by API
------------------
- No valid email ids provided
- TO email id must be provided
- Oops...problem sending mail. Please try again later.

TEST
----

Test folder holds server.js which is testing framework based on CHAI. Testing of the api was done using this framework.  Different urls were tested to check response of API.

