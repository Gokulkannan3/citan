// Fetch.js
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar"; // Import ProgressBar component

function Fetch() {
  const [data, setData] = useState([]);
  const [selectedAwb, setSelectedAwb] = useState(""); // State to store selected AWB number

  useEffect(() => {
    const fetchData = () => {
      fetch("http://172.22.81.182:8080/rfid/getall")
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchData();
  }, []);

  const handleTrackClick = (awb) => {
    // Set the selected AWB number when clicking the "Track" button
    setSelectedAwb(awb);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div className="overflow-x-auto">
            <table className="table table-zebra mx-auto w-1/2">
              <thead>
                <tr>
                  <th className="text-center w-1/4">Name</th>
                  <th className="text-center w-1/4">Brand</th>
                  <th className="text-center w-1/4"> Price</th>
                  <th className="text-center w-1/4">Rating</th>
                  <th className="text-center w-1/4">Tracking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center align-middle w-1/4">{item.awb}</td>
                  <td className="text-center align-middle w-1/4">{item.sender_data}</td>
                  <td className="text-center align-middle w-1/4">{item.dimensions}</td>
                  <td className="text-center align-middle w-1/4">{item.destination_details}</td>
                  <td>
                    <button
                      className="btn btn-neutral"
                      onClick={() => handleTrackClick(item.awb)} // Pass the AWB number to the click handler
                    >
                      Track
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {selectedAwb && <ProgressBar trackingNumber={selectedAwb} />} {/* Render ProgressBar */}
    </div>
  );
}

export default Fetch;
