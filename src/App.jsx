import "./App.css";
import Header from "./components/Header";
import Balance from "./components/Balance";

function App() {
  const title = "Basix Expense Tracker";

  return (
    <div>
      <Header title={title} />
      <div className="container">
        <Balance />
      </div>
    </div>
  );
}

export default App;
