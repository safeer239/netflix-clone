const axios =require('axios');
const { ENV_VARS } = require('../config/envVars');

exports.fetchFromTMDB= async (url)=>{
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY
        }
      };
      
     const response = await axios.get(url, options)
     if(!response.statusCode==200) {
        throw new Error("failed to fetch from tmdb: " + response.statusText)
     }
     return response.data
}