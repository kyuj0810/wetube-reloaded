import 'dotenv/config'
import './db'
import './models/Video'
import './models/User'
import './models/Comment'
import app from './server'

const PORT = 5001

const handleListening = () =>
  console.log(`🟢 Server listenting on port http://localhost:${PORT} 🎈`)

app.listen(PORT, handleListening)
