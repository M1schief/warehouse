const express = require('express');
const app = express();

const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://zhaohc.documents.azure.com:443/";
const key = "JAfwCgGW2WYF5FjQOJ8JHCSrfzNE9rFoSMrC44TbKLnDaGZFYis9dIlh0oDsVQmHoQTyBoCx71jFACDb67hHnA==";
const databaseId = "warehouse";
const containerId = "warehouse";
const config = {
  endpoint,
  key
};
const client = new CosmosClient(config);

  app.get("/api/shipment/:id", async (req, res) => {
    const { id } = req.params;
    const container = client.database(databaseId).container(containerId);
    const query = `SELECT * FROM c WHERE c.ShipmentID = "${id}"`;
    const { resources } = await container.items.query(query).fetchAll();
  
    if (resources.length === 0) {
      res.status(404).send({ message: "Shipment not found" });
    } else {
      res.send(resources[0]);
    }
  });

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  
  //api to upload shipment from json
  app.put('/api/upload', async (req, res) => {
    
    const container = client.database(databaseId).container(containerId);
    const newItem = req.body;
    console.log(newItem);
    const { resource } = await container.items.create(newItem, { disableAutomaticIdGeneration: false });
    res.send(resource);
  });
  
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
