
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import { app } from "./app";


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.info('Server running in the port '+PORT); 
});  
