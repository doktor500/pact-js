import { MessageProviderPact } from "@pact-foundation/pact";
import { createOrderPlacedEvent } from "../src/messageProvider";

const CONSUMER = "AsyncConsumer";
const PROVIDER = "AsyncProvider";
const PROVIDER_VERSION = "1.0.0";
const PACT_BROKER_URL = "http://localhost:8000";

describe("Provider", () => {
  it("publishes a valid orderPlaced event successfully", async () => {
    const provider = new MessageProviderPact({
      consumer: CONSUMER,
      messageProviders: { "orderPlaced": () => Promise.resolve(createOrderPlacedEvent("Y1QU19X")) },
      provider: PROVIDER,
      providerVersion: PROVIDER_VERSION,
      pactBrokerUrl: PACT_BROKER_URL,
      publishVerificationResult: true
    });

    await provider.verify();
  });
});
