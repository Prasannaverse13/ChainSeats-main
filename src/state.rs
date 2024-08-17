use event::{Key, MyEvent};
use linera_sdk::views::{linera_views, LogView, MapView, RootView, ViewStorageContext};

#[derive(RootView, async_graphql::SimpleObject)]
#[view(context = "ViewStorageContext")]
pub struct Events {
    pub my_events: LogView<MyEvent>,
    pub new_events: MapView<Key, MyEvent>,
}
