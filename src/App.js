import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [customersState,setCustomersState] = useState([])
  const [transactionsState,setTransactionsData] = useState([])
  // const [temp,setTemp]=useState(null)
  // data fetching
  const fetchingData = async()=>{
    const [customersData, transactionsData] = await Promise.all([
      axios.get("http://localhost:3000/customers"),
      axios.get("http://localhost:3000/transactions"),
    ]);
    if(customersData.status===200){
      console.log("response is complste")
      setCustomersState(customersData.data)
      setTransactionsData(transactionsData.data);
    }
  }
  useEffect(()=>{
    fetchingData()
  },[])
  return (
    <>
      {customersState.length > 0
        ? customersState.map((item, idx) => (
            <div>
              <h1>idx:{idx} - {item.name}</h1>
              {transactionsState.map((trans) =>
                trans.customer_id === idx+1 ? <h2>trans custom: {trans.customer_id} - {trans.date}</h2> : null
              )}
            </div>
          ))
        : "loaindg"}
    </>
  );
}

export default App;
