import React from "react";

const LocationSearchPanel = ({ findTrip, activeField, setDestination, setpickup, suggestions = [] }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setpickup(suggestion.description); // Use the description from the suggestion object
    } else if (activeField === "destination") {
      setDestination(suggestion.description); // Use the description from the suggestion object
    }
  };

  return (
    <div className="h-[75%]">
      {/* Find Trip Button */}
      <button
        onClick={findTrip}
        className={`text-white bg-black rounded-lg px-4 py-2 w-full ${
          suggestions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={suggestions.length === 0} // Disable button if no suggestions
      >
        Find Trip
      </button>

      {/* Suggestions List */}
      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mt-3">
        {suggestions.length > 0 ? (
          suggestions.map((elem, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(elem)} // Pass the correct suggestion object
              className="flex gap-4 items-center my-2 border-gray-50 active:border-black border-2 p-3 rounded-xl cursor-pointer"
              tabIndex={0} // Make suggestion focusable
              role="button" // Indicate this is a button
              aria-label={`Select ${elem.description}`} // Accessibility label
            >
              {/* Icon */}
              <h2 className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>

              {/* Suggestion Text */}
              <h4 className="font-medium text-gray-700">{elem.description}</h4>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-6">
            No suggestions available. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
