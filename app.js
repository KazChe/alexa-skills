'use strict';

const accountSid = process.env.SID
const authToken = process.env.AUTH
const tphone = process.env.TPHONE
const mPhone = process.env.MPHONE
const twilio = require('twilio')(accountSid, authToken)

module.exports.alexatext = async (event, context) => {

let req = event.request
console.log(">>>>>", req.intent.name)
if (req.type === "LaunchRequest") {
    let options = {}
    options.speechText = "Welcome to text message app. Sends a text message to your phone",
        options.repromptText = "For example you can say text me at then the phone number",
        options.endSession = false
    return buildResponse(options)

} else if (req.type === "IntentRequest") {
    let options = {}

    if (req.intent.name === "HelloIntent") {
        console.log(req.intent.name === "HelloIntent")
        var phone = req.intent.slots.phoneNumber.value
        options.speechText = "Sending text message to " + phone + "."
        options.endSession = true
        await twilio.messages
            .create({body: phone, from: tphone, to: mPhone})
            .then(message => console.log(message.sid))
        return buildResponse(options)

    } else if (req.intent.name === "SendIntent") {
        console.log(req.intent.name === "SendIntent")
        var msg = req.intent.slots.messageText.value
        options.speechText = "Sending message " + msg + "."
        options.endSession = true
        await twilio.messages
            .create({body: msg, from: tphone, to: mPhone})
            .then(message => console.log(message.sid))
        return buildResponse(options)
    }

}
}

function buildResponse(options) {
    let response = {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }
    }
    if (options.repromptText) {
        response.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        }
    }
    return response
}