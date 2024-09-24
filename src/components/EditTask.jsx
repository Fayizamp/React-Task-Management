import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import './AddTask.css'
import { useNavigate, useParams } from 'react-router-dom'
import { editTask } from '../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditTask() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [error, setError] = useState('');
  const tasks = useSelector((state) => state.tasks);

  const handleCancel = () =>{
    navigate('/')
  }

  const taskEdit = tasks.find((task) => task.id === Number(id));
  console.log("editt", taskEdit);

  useEffect(() => {
    if (taskEdit) {
      setTitle(taskEdit.title);
      setStatus(taskEdit.status);
     }
    }, [taskEdit]);


    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) {
        setError('Title is required');
        return;
      }

      dispatch(editTask({ id: Number(id), title, status }));
      navigate("/");
      console.log({title,status});
  }
  return (
   <Container>
      <div className='cont'>
        <h2>Edit Task</h2>
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
   </Container>
  )
}

export default EditTask