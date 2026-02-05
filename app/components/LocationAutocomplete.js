"use client";

import React, { useState, useEffect, useRef } from "react";

const LocationAutocomplete = ({
  defaultValue,
  name = "location",
  placeholder = "Enter location",
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Handle clicking outside to close suggestions
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.length > 1) {
        try {
          const res = await fetch(
            `/api/locations?q=${encodeURIComponent(inputValue)}`,
          );
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSelect = (value) => {
    setInputValue(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="position-relative" ref={wrapperRef}>
      <input
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 shadow-sm"
          style={{
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
            top: "100%",
          }}
        >
          {suggestions.map((loc, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(loc)}
            >
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
