import React from 'react';
import { useQuery } from '@apollo/client';
import { MY_EVENTS } from '../graphql/queries';

const MyEvents = () => {
    const { loading, error, data } = useQuery(MY_EVENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const copyEventDetails = (event) => {
        const eventDetails = `
            Event: ${event.name}
            Description: ${event.description}
            Location: ${event.place}
            Participants: ${event.participants}
        `;
        navigator.clipboard.writeText(eventDetails)
            .then(() => {
                alert('Event details copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying event details to clipboard', err);
            });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-white">My Events</h2>
            {data.myEvents.entries.length === 0 ? (
                <p className="text-gray-300">No events found</p>
            ) : (
                data.myEvents.entries.map((event, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-md mb-4 shadow-lg">
                        <h3 className="text-lg font-bold text-white">{event.name}</h3>
                        <p className="text-gray-300">{event.description}</p>
                        <p className="text-gray-300"><strong>Time:</strong> {new Date(event.timestamp).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                        <p className="text-gray-300"><strong>Location:</strong> {event.place}</p>
                        <p className="text-gray-300"><strong>Participants:</strong> {event.participants}</p>
                        <img src={event.imageUrl} alt={event.name} className="w-full h-64 rounded-md mt-2 object-cover" />
                        <button
                            onClick={() => copyEventDetails(event)}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Copy Event Details
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyEvents;