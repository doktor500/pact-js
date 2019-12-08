import { MessageConsumerPact, Matchers, asynchronousBodyHandler } from "@pact-foundation/pact";
import pact from "@pact-foundation/pact-node";
import * as path from "path";

import { onOrderPlaced } from "../src/sendEmail";

const CONSUMER = "AsyncConsumer";
const CONSUMER_VERSION = "1.0.0";
const PROVIDER = "AsyncProvider";
const PACT_BROKER_URL = "http://localhost:8000";
const PACT_DIR = path.resolve(process.cwd(), "pacts");

describe("Consumer", () => {
  it("handles an order placed event and sends an email to the customer", async () => {
    const messageConsumer = new MessageConsumerPact({
      consumer: CONSUMER,
      dir: PACT_DIR,
      provider: PROVIDER
    });

    await messageConsumer
      .expectsToReceive("orderPlaced")
      .withContent({ detail: { order_number: Matchers.like("QUC4449") } })
      .verify(asynchronousBodyHandler(onOrderPlaced));

    await pact.publishPacts({
      pactFilesOrDirs: [PACT_DIR],
      pactBroker: PACT_BROKER_URL,
      consumerVersion: CONSUMER_VERSION,
    });
  });
});
