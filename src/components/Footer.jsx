export default function Footer() {
  const styles = {
    width: "100%",
    height: "30px",
    backgroundColor: "#1a1a1a",
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <footer style={styles}>
      <p>© 2024 MyListeningPod</p>
    </footer>
  );
}
