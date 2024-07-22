import Styles from "./App.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, updateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function Country(props) {
    const { name, flgImag, flagAltText } = props;
    return (
      <div className={Styles.countryCard} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        height: "200px",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        gap: "5px"
      }}>
        <img src={flgImag} alt={flagAltText} style={{ width: "100px", height: "100px" }} />
        <h2>{name}</h2>
      </div>
    );
  }

  useEffect(() => {
    const apiUrl = "https://restcountries.com/v3.1/all";
    const fetchData = async () => {
      try {
        let ApiData = await axios.get(apiUrl);
        updateData(ApiData.data);
        setFilteredData(ApiData.data);
      } catch (err) {
        console.error("Error fetching data", err);
        // Display error message to the user (optional)
      }
    }
    fetchData();
  }, []);

  function handleInputChange(event) {
    let value = event.target.value.toLowerCase();
    setFilteredData(data.filter(ele => ele.name.common.toLowerCase().includes(value)));
  }

  return (
    <div className="App">
      <input type="text" onChange={handleInputChange} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredData.length > 0 ? (
          filteredData.map(ele => (
            <Country
              key={ele.name.common}
              name={ele.name.common}
              flgImag={ele.flags.svg}
              flagAltText={ele.name.common}
            />
          ))
        ) : (
          <p>No results found</p> // Show a message when no results are available
        )}
      </div>
    </div>
  );
}

export default App;
