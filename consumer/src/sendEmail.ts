import { Handler, ScheduledEvent } from "aws-lambda";
import { EmailSender } from "./emailSender";
import { EventValidator } from "./eventValidator";

const eventValidator = new EventValidator();
const emailSender = new EmailSender();

export const onOrderPlaced: Handler<ScheduledEvent, void> = async (event) => {
    await eventValidator.validate(event.detail);
    await emailSender.sendEmail(event);
};
