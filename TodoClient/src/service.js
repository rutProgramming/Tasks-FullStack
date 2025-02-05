import axios from 'axios';

// הגדרת baseURL מהסביבה

 axios.defaults.baseURL = 'http://localhost:5226/'//process.env.REACT_APP_API_URL;


axios.interceptors.response.use(
  response => response, 
  error => {
      console.error('Error in response:', error); 
      return Promise.reject(error); 
  }
);

// פונקציות API
const api = {
  getTasks: async () => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      const response = await axios.get('/items'); 
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },

  addTask: async (name) => {
    try {
      console.log('addTask', name);
      const result = await axios.post('/items', { name });
      return result.data;
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      console.log('setCompleted', { id, isComplete });
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      console.log('deleteTask', id);
      const result = await axios.delete(`/items/${id}`);
      return result.data;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  }
};

export default api;
