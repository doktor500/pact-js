import { OrderPlaced } from "./events/orderPlaced";

export class EventValidator {
    public async validate(event: OrderPlaced) {
        if (!event.order_number) {
            throw new Error("Invalid order placed event");
        }
    }
}
