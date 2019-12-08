### Pact setup for async messages based on nodejs

Make sure that the pact-broker is running on localhost:8000

Navigate to the `consumer` directory and run `yarn test` to create a contract in the broker.

Navigate to the `provider` directory and run `yarn test` to verify the contract published in the broker.
