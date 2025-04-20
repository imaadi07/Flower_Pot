import { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import Flowercard from './Flowercard.jsx';
import axios from 'axios';

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ image: '', pot_id: '', name: '' });
  const [imagePreview, setImagePreview] = useState('');

  // Fetch flowerpots
  const fetchFlowerpots = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flowerpots');
      setCards(res.data);
    } catch (error) {
      console.error('Error fetching flowerpots:', error);
    }
  };

  useEffect(() => {
    fetchFlowerpots();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchFlowerpots, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'image') {
      setImagePreview(value); // Update preview for image URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/flowerpots', formData);
      setCards([...cards, res.data]);
      setFormData({ image: '', pot_id: '', name: '' });
      setImagePreview('');
      setFormVisible(false);
    } catch (error) {
      console.error('Error adding new pot:', error);
      alert('Failed to add flowerpot. Please try again.');
    }
  };

  const handleDelete = async (pot_id) => {
    if (window.confirm('Are you sure you want to delete this flowerpot?')) {
      try {
        await axios.delete(`http://localhost:5000/api/flowerpots/${pot_id}`);
        setCards(cards.filter((card) => card.pot_id !== pot_id));
      } catch (error) {
        console.error('Error deleting pot:', error);
        alert('Failed to delete flowerpot. Please try again.');
      }
    }
  };

  return (
    <div className="dash-body container mx-auto p-6">
      <div className="dash-heading flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Plants Are Here</h1>
        <button
          className="dash-btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setFormVisible((prev) => !prev)}
        >
          {formVisible ? 'Close' : '➕ Add Pot'}
        </button>
      </div>

      {formVisible && (
        <form
          className="form bg-white p-6 rounded-lg shadow-md mb-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">Add New Pot</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Flower Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input w-full p-2 border rounded"
            />
            <input
              type="text"
              name="pot_id"
              placeholder="Pot ID (e.g., pot_1)"
              value={formData.pot_id}
              onChange={handleInputChange}
              required
              className="form-input w-full p-2 border rounded"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="form-input w-full p-2 border rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded mt-2"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/80')}
              />
            )}
            <button
              type="submit"
              className="input-btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create Card
            </button>
          </div>
        </form>
      )}

      <div className="dash-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No flowerpots added yet.
          </p>
        ) : (
          cards.map((card) => (
            <div key={card.pot_id} className="relative">
              <Flowercard
                image={card.image}
                name={card.name}
                moisture={card.moisture}
              />
              <button
                onClick={() => handleDelete(card.pot_id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}