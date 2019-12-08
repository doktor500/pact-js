import { MessageConsumerPact, Matchers, synchronousBodyHandler } from "@pact-foundation/pact";
import pact from "@pact-foundation/pact-node";
import * as path from "path";

const CONSUMER = "Consumer";
const CONSUMER_VERSION = "1.0.0";
const PROVIDER = "Provider";
const PROVIDER_VERSION = "1.0.0";
const PACT_BROKER_URL = "http://localhost:8000";
const PACT_DIR = path.resolve(process.cwd(), "pacts");

const eventHandler = (event) => {
  if (!event.id) {
    throw new Error("Invalid event")
  }
};

describe("Consumer", () => {
  it("handles a valid event successfully", async () => {
    const messageConsumer = new MessageConsumerPact({
      consumer: CONSUMER,
      dir: PACT_DIR,
      provider: PROVIDER,
      providerVersion: PROVIDER_VERSION
    });

    messageConsumer
      .expectsToReceive("a-valid-event")
      .withContent({ id: Matchers.like(1) })
      .verify(synchronousBodyHandler(eventHandler));

    await pact.publishPacts({
      pactFilesOrDirs: [PACT_DIR],
      pactBroker: PACT_BROKER_URL,
      consumerVersion: CONSUMER_VERSION,
    });
  });
});
