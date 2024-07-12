function BlackenScreen({ visible }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "opacity 0.5s ease-in-out",
          backgroundColor: "rgba(0, 0, 0, 1)", // Semi-transparent black overlay
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none", // Allow interaction when visible
        }}
      ></div>
    </>
  );
}

export default BlackenScreen;
