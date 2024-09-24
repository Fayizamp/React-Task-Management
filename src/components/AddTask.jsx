import React, { useState } from 'react'
import {  Form } from 'react-bootstrap'
import './AddTask.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { useNavigate } from 'react-router-dom';


function AddTask() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const [error, setError] = useState('');

    // const [data, setData] =useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate hook
  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') {
          setError('Title is required.');
          return;
        }
        const now = new Date().toLocaleString();
        const newTask = {
          id: Date.now(), 
          title,
          status,
          time: now,
        };
        dispatch(addTask(newTask));
        // dispatch(addTask({title,status, time:now}));
        navigate("/")
        console.log({title,status,now});
    }

    const handleCancel = () => {
        setTitle('');
        setStatus(''); 
        navigate("/");
        setError('');
        // window.location.href = '/';       
      };

  return (
    <div className='cont'>
        {/* <Modal.Header closeButton className='close'>
        </Modal.Header> */}
        <h2>Add a new task</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>  
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Title :</Form.Label>
          <Form.Control id="disabledTextInput" value={title} 
            onChange={(e) => setTitle(e.target.value)
            }/>
            <p className="error-message" style={{ color: 'red' }}>{error}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="status">status :</Form.Label>
          <Form.Select id="status" value={status}  onChange={(e) => setStatus(e.target.value)} >
            {/* <option value="completed" >select status</option> */}
            <option value="incomplete">incomplete</option>
            <option value="completed" >completed</option>

          </Form.Select>
        </Form.Group>
        <button type="submit" className='sub'>Submit</button>
        <button className='cancel' onClick={handleCancel} >Cancel</button>
    </Form>
    </div>
  )
}

export default AddTask
