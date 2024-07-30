import React, { useState } from "react";

function PersonsData() {
  let [data, setData] = useState([]);
  let getPersonsData = async () => {
    let reqOptions = {
      method: "GET",
    };
    let JSONData = await fetch(
      "http://localhost2389/persondetails",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setData(JSOData);
    console.log(JSOData);
  };

  return (
    <div>
      <button
        onClick={() => {
          getPersonsData();
        }}
      >
        Get Data
      </button>
      {data.map((ele, i) => {
        return <h1 key={i}> {ele.age}</h1>;
      })}
    </div>
  );
}

export default PersonsData;
