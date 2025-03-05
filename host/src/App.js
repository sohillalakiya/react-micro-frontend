import React, { lazy, Suspense, useState } from "react";

const Client1 = lazy(() => import("CLIENT1/app"));
const Client2 = lazy(() => import("CLIENT2/app"))

const App = () => {
  const [name, setName] = React.useState(null);

  return (
    <div className="App" style={{border: "1px solid black", padding: "25px"}}>
      <h1>This is Host app</h1>
      <h2>Client1 and Client2 will integrate here</h2>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name" />
      { name ? <p>Your name is: {name}</p> : null }
      <div>
        <Suspense fallback={<span>Loading...</span>}>
          <Client1 onChange={(e) => setName(e.target.value)} value={name} />
            <br/>
          <Client2 onChange={(e) => setName(e.target.value)} value={name}/>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
