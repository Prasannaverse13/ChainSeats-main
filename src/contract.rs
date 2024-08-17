#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;
use event::{EventAbi, Key, Message, MyEvent, Operation};
use linera_sdk::{
    base::{ChannelName, Destination, MessageId, WithContractAbi},
    views::{RootView, View, ViewStorageContext},
    Contract, ContractRuntime,
};
use state::Events;

const EVENTS_CHANNEL: &[u8] = b"events";
const MAX_RECENT_EVENTS: usize = 10;

pub struct EventContract {
    state: Events,
    runtime: ContractRuntime<Self>,
}

linera_sdk::contract!(EventContract);

impl WithContractAbi for EventContract {
    type Abi = EventAbi;
}

impl Contract for EventContract {
    type Message = Message;
    type InstantiationArgument = ();
    type Parameters = ();

    async fn load(runtime: ContractRuntime<Self>) -> Self {
        let state = Events::load(ViewStorageContext::from(runtime.key_value_store()))
            .await
            .expect("Failed to load state");
        EventContract { state, runtime }
    }

    async fn instantiate(&mut self, _argument: ()) {
        // Validate that the application parameters were configured correctly.EVENTS
        self.runtime.application_parameters();
    }

    /*
        Example query:

        mutation {
            event(
            time: "2024-07-09 10:00:00",
            name: "Linera Hackathon 2024",
            place: "Online",
            description: "Linera Spring Hackathon",
            participants: 100,
            imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*kPq71LOX3wioySgTkb-yqw.jpeg"
            )
        }

    */

    async fn execute_operation(&mut self, operation: Operation) -> Self::Response {
        let (destination, message) = match operation {
            Operation::SubscribeEvent { chain_id } => (chain_id.into(), Message::SubscribeEvent),
            Operation::UnsubscribeEvent { chain_id } => {
                (chain_id.into(), Message::UnsubscribeEvent)
            }
            Operation::Event {
                time,
                name,
                place,
                description,
                participants,
                image_url,
            } => {
                self.execute_event_operation(
                    time,
                    name,
                    place,
                    description,
                    participants,
                    image_url,
                )
                .await
            }
            Operation::DeleteEvent { key } => self.execute_delete_event_operation(key).await,
        };

        self.runtime.send_message(destination, message);
    }

    async fn execute_message(&mut self, message: Message) {
        let id = self
            .runtime
            .message_id()
            .expect("ID must be available for message execution");
        match message {
            Message::SubscribeEvent => self
                .runtime
                .subscribe(id.chain_id, ChannelName::from(EVENTS_CHANNEL.to_vec())),
            Message::UnsubscribeEvent => self
                .runtime
                .unsubscribe(id.chain_id, ChannelName::from(EVENTS_CHANNEL.to_vec())),
            Message::Events { count, events } => self.execute_events_message(id, count, events),
            Message::EventDeleted => self.execute_event_deleted_message(id),
        }
    }

    async fn store(mut self) {
        self.state.save().await.expect("Failed to save state");
    }
}

impl EventContract {
    async fn execute_event_operation(
        &mut self,
        _time: String,
        name: String,
        place: String,
        description: String,
        participants: u32,
        image_url: String,
    ) -> (Destination, Message) {
        let timestamp = self.runtime.system_time();
        self.state.my_events.push(MyEvent {
            timestamp: timestamp,
            name,
            place,
            description,
            participants,
            image_url,
        });
        let count = self.state.my_events.count();
        let mut events = vec![];
        for index in (0..count).rev().take(MAX_RECENT_EVENTS) {
            let event_ = self
                .state
                .my_events
                .get(index)
                .await
                .expect("Unable to retrieve event");
            let my_event = event_.expect("The event with a valid index is missing");
            events.push(my_event);
        }
        let count = count as u64;
        (
            ChannelName::from(EVENTS_CHANNEL.to_vec()).into(),
            Message::Events { count, events },
        )
    }

    fn execute_events_message(&mut self, _message_id: MessageId, count: u64, events: Vec<MyEvent>) {
        for (index, event) in (0..count).rev().zip(events) {
            let key = Key { index };
            self.state
                .new_events
                .insert(&key, event)
                .expect("Inserting event failed");
        }
    }

    async fn execute_delete_event_operation(&mut self, key: Key) -> (Destination, Message) {
        self.state
            .new_events
            .remove(&key)
            .expect("Failed to delete event");
        (
            ChannelName::from(EVENTS_CHANNEL.to_vec()).into(),
            Message::EventDeleted,
        )
    }

    fn execute_event_deleted_message(&mut self, _message_id: MessageId) {
        // No action required for the moment
    }
}
