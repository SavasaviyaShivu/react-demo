import "./App.css";
import "./style.css"
import React, { lazy, Suspense } from "react";
const InputStyle = lazy(() => import("./pages/InputStyle"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <InputStyle />
      </Suspense>
    </div>
  );
}

export default App;
