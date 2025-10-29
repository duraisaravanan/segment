import { useState } from "react";
import { Button } from "primereact/button";
import SegmentModal from "./components/SegmentModal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#f0f4f8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "1rem" }}>
          Segment Builder Demo
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Click below to create a new segment
        </p>
        <Button
          label="Save Segment"
          icon="pi pi-check mr-3"
          onClick={() => setShowModal((value) => !value)}
        />
      </div>

      {showModal && (
        <SegmentModal
          visible={showModal}
          onClose={(value) => setShowModal(value)}
        />
      )}
    </div>
  );
}
