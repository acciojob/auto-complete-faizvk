import React, { useState, useEffect } from "react";
import "./styles.css";

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

export default function AutoComplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(fruits);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!query) {
        setSuggestions(fruits);
        return;
      }
      const filtered = fruits.filter((fruit) =>
        fruit.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filtered);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (fruit) => {
    setQuery(fruit);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        className="search"
        placeholder="Search fruit"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="suggestions">
        {suggestions.map((fruit, index) => (
          <li key={index} onClick={() => handleSelect(fruit)}>
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}
