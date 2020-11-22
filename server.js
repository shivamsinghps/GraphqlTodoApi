import app from './app'

const listening_Port = process.env.PORT || 5000
app.listen(listening_Port, () => console.log(`server starting on port ${listening_Port}!`));