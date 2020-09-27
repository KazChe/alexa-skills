'use strict';

const twilio = require('twilio');

module.exports.alexatext = async (event, context) => {

    try {
        let req = event.request

        if(req.type === "LaunchRequest") {
            let options = {}
            options.speechText="Welcome to text message app. Sends a text message to your phone",
                options.repromptText="For example you can say text me at then the phone number",
                options.endSession=false
            context.succeed(buildResponse(options))

        } else if(req.type === "IntentRequest") {
            let options = {}

            if(req.intent.name === "HelloIntent") {
                let phone = req.intent.slots.phoneNumber.value
                options.speechText = "Sending text message to "+phone+"."
                options.endSession = true
                context.succeed(buildResponse(options))
            } else {
                throw "Unknown Intent"
            }

        } else if(req.type === "SessionEndedRequest") {

        } else {
            throw "Unknown Intent Type"
        }

    } catch (e) {
        context.fail("Error::: ", e)
    }
};

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
    if(options.repromptText) {
        response.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        }
    }
    return response
}