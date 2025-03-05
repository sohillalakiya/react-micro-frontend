import * as React from "react";
import App from "./App";

export default function MainApp() {
  const [name, setName] = React.useState(null);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        {name ? <p>Your name is: {name}</p> : null}
      </h3>
      <App onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
