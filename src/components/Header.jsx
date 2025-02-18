export default function Header() {
  const styles = {
    width: "100%",
    height: "60px",
    backgroundColor: "#1a1a1a",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    paddingBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <header style={styles}>
      <h1>MyListeningPod</h1>
    </header>
  );
}
