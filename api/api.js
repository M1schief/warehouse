const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
const validateApiKey = require('./auth');
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://zhaohc.documents.azure.com:443/";
const key = "JAfwCgGW2WYF5FjQOJ8JHCSrfzNE9rFoSMrC44TbKLnDaGZFYis9dIlh0oDsVQmHoQTyBoCx71jFACDb67hHnA==";
//const key = "JAfwCgGW2WYF5FjQOJ8JHCSrfzNE9rFoSMrC44TbKLnDaGZFYis9dIlh0oDsVQmHoQTyBoCx71jFACDb67hHnA111111==";
const databaseId = "warehouse";
const containerId = "warehouse";
const config = {
  endpoint,
  key
};
const client = new CosmosClient(config);

app.get("/api/shipment/:id", validateApiKey, async (req, res) => {
  const { id } = req.params;
  const container = client.database(databaseId).container(containerId);
  const query = `SELECT * FROM c WHERE c.ShipmentID = "${id}"`;
  const { resources } = await container.items.query(query).fetchAll();

  if (resources.length === 0) {
    res.status(404).json({ message: "Shipment not found" });
  } else {
    console.log(resources);
    const shipment = JSON.parse(JSON.stringify(resources[0]));
    res.send(shipment);
  }
});


  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  
  //api to upload shipment from json
  app.put('/api/upload', validateApiKey, async (req, res) => {
    
    const container = client.database(databaseId).container(containerId);
    const newItem = req.body;
    console.log(newItem);
    const { resource } = await container.items.create(newItem, { disableAutomaticIdGeneration: false });
    res.send(resource);
  });
  
  
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
