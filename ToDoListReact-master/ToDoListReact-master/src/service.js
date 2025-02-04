import axios from 'axios';

const apiUrl = "http://localhost:5226"

export default {
  getTasks: async () => {
    
    const result = await axios.get(`${apiUrl}/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    const result = await axios.post(`${apiUrl}/items`,{name})    
    return result;    
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`${apiUrl}/items/${id}`,{isComplete});    
    return result;  
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`${apiUrl}/items/${id}`)    
    return result;
  }
};
