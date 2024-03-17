import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [transactions, setTransactions] = useState("");
  const categories = ["Food", "Entertainment", "Bills", "Shopping", "Other","Coding","Courses","Sports"];
  const [selectedCategory, setSelectedCategory] = useState("");

  function formatDateTime(datetimeString) {
    const dateObj = new Date(datetimeString); // Create a Date object
    const formattedDate = dateObj.toLocaleDateString('en-GB', { // Use GB locale for DD/MM format
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { // Use US locale for HH:MM format
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} ${formattedTime}`;
  }
  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);
// TODO: ERROR HANDLING ! 
  async function getTransactions() {
    const url = (process.env.REACT_APP_API_URL + "/transaction");
    // const url = "http://localhost:3001/api/transaction";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = (process.env.REACT_APP_API_URL + "/transaction");
    // const url = "http://localhost:3001/api/transaction";
    console.log(url);
 

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price,
        name: name,
        description: description,
        category: selectedCategory,
        datetime: datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
      });
      window.location.reload();
    });

  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price? transaction.price : 0;
  }
  balance = balance.toFixed(2);

  return (
    <main>
      <h1>
        {balance}
        <span>.00</span>
      </h1>
      <form action="" onSubmit={addNewTransaction}>
        <div className="basic">
          <h3>Name :</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Name"}
            required
            />
          <label for="name">Enter the name of transaction.</label>  
        </div>
          <hr></hr>
        <div className="basic">
          <h3>DateTime :</h3>
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
            type="datetime-local"
            />
          <label for="datetime">Enter the date of transaction.</label>  
        </div>
          <hr></hr>
        <div className="price">
          <h3>Price :</h3>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={"Price"}
            required
            />
          <label for="price">Enter the price of transaction.</label>  
          <br></br>
          <span style={{fontSize:"small"}} for="price">Note: -ve value indicate spending and +ve value indicate income*.</span> 
        </div> 
          <hr></hr>
        <div className="description">
          <h3>Description :</h3>
          <input
          required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Description"}
            />
            <label for="description">Enter your transaction description.</label> 
        </div> 
        <hr></hr>
        <div className="category">
          <h3>Category:</h3>
          <select
          style={{width:'100%',background:'#17181F',color:"white",borderColor:'#30313D',padding:'5px 0',border:'1px solid #30313D',borderRadius:'10px'}}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.slice(1).map((transaction, index) => (
            <div key={index} className="transaction"> 
              <div className="left">
                <div className="name">{transaction.name}</div>
                {transaction.category && ( 
                  <div className="category">Category: {transaction.category}</div>
                )}
                <div className="description">Description: {transaction.description}</div>
              </div>
              <div className="right"> 
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{formatDateTime(transaction.datetime)}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
