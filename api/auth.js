const apiKey = "CFQPDcvIc8Tp3nftFiToGpmSI1g8NQ1quzejFYnhrnVvqsZC5QLIHYgo4ZszM9gHP1LIXWNoYt20ACDbrCkJwA=="

async function validateApiKey(req, res, next) {
  const providedKey = req.header('X-API-Key');
  if (!providedKey) {
    return res.status(401).send({ message: "API key missing" });
  }
  if (providedKey === apiKey) {
    next();
  } else {
    res.status(401).send('Invalid API key');
  }
}

module.exports = validateApiKey;
