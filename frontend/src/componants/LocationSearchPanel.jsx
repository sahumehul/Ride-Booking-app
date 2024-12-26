const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel, activeField, setDestination, setpickup, suggestions }) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setpickup(suggestion.description); // Use the description from the suggestion object
    } else if (activeField === 'destination') {
      setDestination(suggestion.description); // Use the description from the suggestion object
    }
    
  }

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div 
          key={idx} 
          onClick={() => handleSuggestionClick(elem)} // Pass the correct suggestion object
          className="flex gap-4 items-center justify-start my-2 border-gray-50 active:border-black border-2 p-3 rounded-xl"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
