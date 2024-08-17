import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UNSUBSCRIBE_EVENT } from '../graphql/queries';
import { ToastContainer, toast } from 'react-toastify';

const UnsubscribeEvent = () => {
    const [unsubscribeEvent] = useMutation(UNSUBSCRIBE_EVENT);
    const [chainId, setChainId] = useState('');

    const handleUnsubscribe = async () => {
        try {
            await unsubscribeEvent({ variables: { chainId } });
            toast.success('Unsubscribed from events successfully!');
        } catch (error) {
            toast.error('Error unsubscribing from events!');
        }
    };

    const handleChainIdChange = (e) => {
        setChainId(e.target.value);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Unsubscribe from Events</h2>
            <input
                type="text"
                value={chainId}
                onChange={handleChainIdChange}
                placeholder="Enter Chain ID"
                className="bg-gray-700 text-white p-2 rounded-md mb-2"
            />
            <button onClick={handleUnsubscribe} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                Unsubscribe
            </button>
        </div>
    );
};

export default UnsubscribeEvent;