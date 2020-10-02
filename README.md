# alexa-send-text-message

- Use alexa skills for sending text-message
- Model is setup on developer.amazon.com's Alexa console
- Lambda deployed to my own personal AWS account
- Uses Twilio for sending the message to a phone number
- On alexa developer console set and configure invocation and intent. **Note** I chose to make the `slot` name of
type `AMAZON.SearchQuery` as it worked best in this case.

![Invication](https://github.com/KazChe/alexa-skills/blob/master/assets/invocation.png?raw=true)

![Intetnt](https://raw.githubusercontent.com/KazChe/alexa-skills/master/assets/intent.png)

- In Alexa developer console test the skill by saying `Alexa ask mytext app to send me <speak_your_message_t_be_sent>`