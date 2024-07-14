import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [customersState,setCustomersState] = useState([])
  // data fetching
  const fetchingData = async()=>{
    const [customersData, transactionsData] = await Promise.all([
      axios.get("http://localhost:3000/customers"),
      axios.get("http://localhost:3000/customers"),
    ]);
    if(customersData.status===200){
      console.log("response is complste")
      setCustomersState(customersData.data)
    }
  }
  useEffect(()=>{
    fetchingData()
  },[])
  return <>
    {
      customersState.length>0?customersState.map(item=><h1>{item.name}</h1>):"loaindg"
    }
  </>;
}

export default App;
