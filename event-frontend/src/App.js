import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createClient, current_chain_1, current_chain_2, application_id } from './graphql/client';
import EventList from './components/EventList';
import MyEvents from './components/MyEvents';
import CreateEvent from './components/CreateEvent';
import SubscribeEvent from './components/SubscribeEvent';
import UnsubscribeEvent from './components/UnsubscribeEvent';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [view, setView] = useState('myEvents');
  const [selectedChain, setSelectedChain] = useState(current_chain_1);
  const client = createClient(selectedChain);

  return (
    <ApolloProvider client={client}>
      <div className="App p-8 bg-gray-900 min-h-screen">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">ChainSeats</h1>
          <p className="text-lg text-gray-400">Manage your events seamlessly on the Linera microchain</p>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <CreateEvent />
              <div className="mt-4">
                <nav className="flex space-x-4 mb-4">
                  <button
                    className={`tab-button ${view === 'myEvents' ? 'bg-green-500' : ''}`}
                    onClick={() => setView('myEvents')}
                  >
                    My Events
                  </button>
                  <button
                    className={`tab-button ${view === 'subscribedEvents' ? 'bg-green-500' : ''}`}
                    onClick={() => setView('subscribedEvents')}
                  >
                    Subscribed Events
                  </button>
                </nav>
                <div className="tab-content">
                  {view === 'myEvents' && <MyEvents />}
                  {view === 'subscribedEvents' && <EventList />}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <SubscribeEvent />
              <UnsubscribeEvent />
              <div className="mt-4">
                <label className="text-white">Select Chain:</label>
                <select
                  className="ml-2 p-2 bg-gray-800 text-white"
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                >
                  <option value={current_chain_1}>Chain 1</option>
                  <option value={current_chain_2}>Chain 2</option>
                </select>
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-8 text-gray-500 text-center">
          <p>Chain ID: <span className="text-white">{selectedChain}</span></p>
          <p>Application ID: <span className="text-white">{application_id}</span></p>
        </footer>
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;