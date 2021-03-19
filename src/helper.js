import React from "react";

export const DisplayResults = ({ results }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <h3 style={{ fontFamily: "monospace" }}>Results</h3>
      <pre
        style={{
          background: "#f6f8fa",
          fontSize: "1rem",
          padding: ".5rem",
        }}
      >
        <strong>results</strong> = {JSON.stringify(results, null, 4)}
      </pre>
    </div>
  );
};
