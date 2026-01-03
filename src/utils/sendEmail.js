const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");



const sendEmail = async (messageText) => {
  const params = {
    Destination: {
      ToAddresses:["sr6129454@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: messageText,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Connection Request Notification",
      },
    },
    Source: "sreeja@devtinder.sreejadev.in", // Must be verified in SES
  };

  const command = new SendEmailCommand(params);
  return await sesClient.send(command); 
  ;
};

module.exports = sendEmail;

