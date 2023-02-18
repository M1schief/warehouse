import './App.css';
import React, { useState } from 'react';
function App() {
  
  const [shipmentId, setShipmentId] = useState('');
  const [shipments, setShipments] = useState({
    ShipmentID: '',
    WarehouseID: '',
    ShippingPO: '',
    BoxesRcvd: '',
    Date: ''
  });
  function handleShipmentIdChange(event) {
    const newShipmentId = event.target.value;
    setShipmentId(newShipmentId);
  }

  const getShipment = async () => {
    const res = await fetch(`https://autowhapi.azurewebsites.net/api/shipment/` + shipmentId, {
      method: "GET",
      headers:{
        'Content-Type':'application/json',
        'X-API-Key': 'CFQPDcvIc8Tp3nftFiToGpmSI1g8NQ1quzejFYnhrnVvqsZC5QLIHYgo4ZszM9gHP1LIXWNoYt20ACDbrCkJwA=='
      }
    });
    console.log(res);
    const json = await res.json();
    setShipments(json);
    console.log(shipments);
  };
  
  return (
    <div>
      <label>Shipment ID:</label>
      <input type="text" value={shipmentId} onChange={handleShipmentIdChange} />
      <button onClick={() => getShipment()}>Query</button>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Date</th>
            <th>Warehouse ID</th>
            <th>Shipping PO</th>
            <th>Boxes Received</th>
          </tr>
        </thead>
        <tbody>
          <tr key={shipments.ShipmentID}>
            <td>{shipments.ShipmentID}</td>
            <td>{shipments.Date}</td>
            <td>{shipments.WarehouseID}</td>
            <td>{shipments.ShippingPO}</td>
            <td>{shipments.BoxesRcvd}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
