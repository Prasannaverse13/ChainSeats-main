import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS, DELETE_EVENT } from '../graphql/queries';

const EventList = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    const [deleteEvent] = useMutation(DELETE_EVENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleDelete = (key) => {
        deleteEvent({ variables: { key: { index: key } } })
            .then(response => {
                console.log('Event deleted successfully', response);
            })
            .catch(err => {
                console.error('Error deleting event', err);
            });
    };

    const handleShare = (key) => {
        const shareableLink = `${window.location.origin}/event/${key}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => {
                alert('Sharable link copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying link to clipboard', err);
            });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-white">Upcoming Events</h2>
            {data.newEvents.entries.map(({ key, value }) => (
                <div key={key.index} className="bg-gray-700 p-4 rounded-md mb-4 shadow-lg">
                    <h3 className="text-lg font-bold text-white">{value.name}</h3>
                    <p className="text-gray-300">{value.description}</p>
                    <p className="text-gray-300"><strong>Location:</strong> {value.place}</p>
                    <p className="text-gray-300"><strong>Participants:</strong> {value.participants}</p>
                    <img src={value.imageUrl} alt={value.name} className="w-full h-64 rounded-md mt-2 object-cover" />
                    <button onClick={() => handleDelete(key.index)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete Event
                    </button>
                    <button onClick={() => handleShare(key.index)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Share Event
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EventList;