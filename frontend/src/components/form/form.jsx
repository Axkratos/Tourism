import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('Kathmandu 44600, Nepal');
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(null);
    const [numPeople, setNumPeople] = useState('Just me');
    const [priceBid, setPriceBid] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'location':
                setLocation(value);
                break;
            case 'numPeople':
                setNumPeople(value);
                break;
            case 'priceBid':
                setPriceBid(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tripDetails = {
            location,
            dateFrom,
            dateTo,
            numPeople,
            priceBid,
        };
        
        try {
            const response = await fetch('http://localhost:3000/api/trip/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const data = await response.json();
            console.log('Trip created successfully:', data);
            setSuccess(true);
            navigate('/');  // Redirect to home or another page if needed
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-xl font-semibold mb-4 dark:text-white">Create a trip</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">Trip created successfully!</p>}
            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Where are you going?</label>
                <div className="relative">
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    />
                    <img src="https://placehold.co/20x20" alt="search icon" className="absolute right-3 top-3" />
                </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Date from</label>
                    <div className="relative">
                        <DatePicker
                            selected={dateFrom}
                            onChange={date => setDateFrom(date)}
                            className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                        />
                        <img src="https://placehold.co/20x20" alt="calendar icon" className="absolute right-3 top-3" />
                    </div>
                </div>
                <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Date to</label>
                    <div className="relative">
                        <DatePicker
                            selected={dateTo}
                            onChange={date => setDateTo(date)}
                            className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                        />
                        <img src="https://placehold.co/20x20" alt="calendar icon" className="absolute right-3 top-3" />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Number of people</label>
                <select
                    name="numPeople"
                    value={numPeople}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                >
                    <option>Just me</option>
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                    <option>5 people</option>
                    <option>6 people</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Price Bid</label>
                <input
                    type="text"
                    name="priceBid"
                    value={priceBid}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
            </div>
            <button type="submit" className=" bg-red-400  hover:bg-red-600 text-white w-full py-2 rounded-lg mb-4">CREATE NEW TRIP</button>
        </form>
    );
}
