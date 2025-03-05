import * as React from "react";

export default function App({ onChange, value }) {
  return (
    <div style={{ border: "1px solid black", padding: "30px" }}>
      <div className="MicroApp">
        <h1>Client1 App</h1>
        <input onChange={onChange} value={value} type="text" placeholder="Enter your name" />
      </div>
    </div>
  );
}
