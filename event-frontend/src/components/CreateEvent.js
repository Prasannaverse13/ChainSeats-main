import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, MY_EVENTS } from '../graphql/queries';
import { ToastContainer, toast } from 'react-toastify';

const CreateEvent = () => {
    const [createEvent] = useMutation(CREATE_EVENT, {
        refetchQueries: [{ query: MY_EVENTS }],
    });
    const [formData, setFormData] = useState({
        name: '',
        place: '',
        description: '',
        participants: 0,
        imageUrl: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent({
                variables: {
                    time: new Date().toISOString(),
                    name: formData.name,
                    place: formData.place,
                    description: formData.description,
                    participants: parseInt(formData.participants),
                    imageUrl: formData.imageUrl,
                },
            });
            toast.success('Event created successfully!');
        } catch (error) {
            toast.error('Error creating event!');
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Create Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    className="bg-gray-700 text-white p-2 rounded-md"
                />
                <input
                    name="place"
                    onChange={handleChange}
                    placeholder="Place"
                    className="bg-gray-700 text-white p-2 rounded-md"
                />
                <textarea
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    className="bg-gray-700 text-white p-2 rounded-md"
                />
                <input
                    name="participants"
                    onChange={handleChange}
                    placeholder="Participants"
                    type="number"
                    className="bg-gray-700 text-white p-2 rounded-md"
                />
                <input
                    name="imageUrl"
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="bg-gray-700 text-white p-2 rounded-md"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;