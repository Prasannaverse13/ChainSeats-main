#!/bin/bash

# Build the project
cargo build

# Add the target/debug directory to the PATH
export PATH=$PWD/target/debug:$PATH

# Use current devnet faucet; can ignore if wallet already exists
# linera wallet init --with-new-chain --faucet https://faucet.devnet-2024-05-07.linera.net


# Initialize the Linera network helper and spawn/read wallet variables, then start the Linera network
eval "$(linera net helper)"
linera_spawn_and_read_wallet_variables \
    linera net up \
        --extra-wallets 1

# Publish and create the application, capturing the APP_ID
linera --with-wallet 0 publish-and-create \
  target/wasm32-unknown-unknown/release/event_{contract,service}.wasm

# Start the Linera services and keep them running
linera --with-wallet 0 service --port 8080 &
linera --with-wallet 1 service --port 8081 &

# Wait for background processes to finish
wait