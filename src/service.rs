#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use std::sync::Arc;
use event::EventAbi;
use async_graphql::{EmptySubscription, Request, Response, Schema};
use linera_sdk::{
    base::WithServiceAbi,
    graphql::GraphQLMutationRoot,
    views::{View, ViewStorageContext},
    Service, ServiceRuntime,
};
use event::Operation;
use state::Events;

pub struct EventService {
    state: Arc<Events>,
}

linera_sdk::service!(EventService);

impl WithServiceAbi for EventService {
    type Abi = EventAbi;
}

impl Service for EventService {
    type Parameters = ();

    async fn new(runtime: ServiceRuntime<Self>) -> Self {
        let state = Events::load(ViewStorageContext::from(runtime.key_value_store()))
            .await
            .expect("Failed to load state");
        EventService {
            state: Arc::new(state),
        }
    }

    async fn handle_query(&self, request: Request) -> Response {
        let schema = Schema::build(
            self.state.clone(),
            Operation::mutation_root(),
            EmptySubscription,
        )
        .finish();
        schema.execute(request).await
    }
}
