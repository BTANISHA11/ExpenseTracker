
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = "http://localhost:3001/api/transaction";
    const response = await fetch(url);
    return await response.json();
  }

  async function addNewTransaction(e) {
    e.preventDefault();

    const url = "http://localhost:3001/api/transaction";

    const price = parseFloat(name.split(" ")[0]); // Parse price as a float

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.toString().length + 1),
        description,
        datetime,
      }),
    });

    const json = await response.json();
    setTransactions([...transactions, json]); // Update transactions with the new entry

    setName("");
    setDatetime("");
    setDescription("");
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + parseFloat(transaction.price);
  }
  balance = balance.toFixed(2);

  return (
    <main>
      <h1>
        {balance}
        <span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"price and name"}
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (parseFloat(transaction.price) < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
