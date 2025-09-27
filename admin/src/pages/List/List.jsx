import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';

const List = ({url}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
     

      if (response.data.success) {
        setList(response.data.data);
      } else {
        setError('Failed to fetch data');
        console.error('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

const removeFood = async (foodId)=>{
const response = await axios.post (`${url}/api/food/remove`,{id:foodId});
await fetchList();
if (response.data.success) {
  console.log ("remove succesfully")
}
else error ("failed remove")
}

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button onClick={()=> removeFood(item._id)} className='delete-btn'>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;