import { MessageProviderPact } from "@pact-foundation/pact";

const PROVIDER = "Provider";
const PROVIDER_VERSION = "1.0.0";
const PACT_BROKER_URL = "http://localhost:8000";

const validEvent = { id: 1 };
const messageProvider = { validEvent: () => Promise.resolve(validEvent) };

describe("Provider", () => {
  it("publishes a valid event successfully", async () => {
    const provider = new MessageProviderPact({
      messageProviders: { "a-valid-event": () => messageProvider.validEvent() },
      provider: PROVIDER,
      providerVersion: PROVIDER_VERSION,
      pactBrokerUrl: PACT_BROKER_URL,
      publishVerificationResult: true
    });

    await provider.verify();
  });
});
