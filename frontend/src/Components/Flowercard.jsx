import '../Styles/Flowercard.css';

export default function Flowercard({ image, name, moisture }) {
  // Convert moisture to a number for the progress bar, default to 0 if 'N/A'
  const moistureValue = moisture === 'N/A' ? 0 : parseFloat(moisture);
  const isValidMoisture = moisture !== 'N/A' && !isNaN(moistureValue);

  return (
    <div className="card bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="card-img w-full h-40 object-cover"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
      />
      <div className="card-content p-4">
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-gray-600">
          Moisture Level: {isValidMoisture ? `${moisture}%` : 'N/A'}
        </p>
        <div className="moisture-bar-container mt-2">
          <div
            className="moisture-bar"
            style={{
              width: isValidMoisture ? `${Math.min(moistureValue, 100)}%` : '0%',
              backgroundColor: isValidMoisture ? '#4CAF50' : '#e0e0e0',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}