import React, { useState } from 'react'
import styles from "../styles/data.module.css"
import axios from 'axios';
import ShowTask from './ShowTask';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Data = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showInput, setInput] = useState(false);
  const [error, setError] = useState('');

  const toggleInput = () => {
    setInput(!showInput);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const taskName = {
      title: title,
      description: description
    }

    if (!title || !description) {
      setError("Please fill all the inputs")
      return;
    }

    try {
      const api = await axios.post('https://lovely-pike-suspenders.cyclic.app/task/add', taskName);
      alert("Task is Added")
      console.log(api);
      setInput(!showInput);

      setTitle('');
      setDescription('');

    } catch (error) {
      console.log(error)
    }
  }

 


  return (
    <div className={styles.main}>
      <div className={styles.data}>
        <div className={styles.taskapp}>
          <h1>Task Application</h1>
        </div>
      </div>
      <div className={styles.centerButtons}>
      <button className={styles.btnPro} onClick={toggleInput}>
        Add Task
      </button>
      <div className={styles.buttonSpacer}></div>
    </div>

      {
        showInput && (
          <div className={styles.center}>
            <div className={styles.inpPart}>
              <form onSubmit={handleSubmit}>
                <input type="text" name="title" id="title" className={styles.inptag} placeholder='Enter Your Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <br />
                <input type="text" name="description" id="description" className={styles.inptag} placeholder='Enter Your Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <br />
                <p className={styles.error}>
                  {error}
                </p>
                <button type='submit' className={styles.btnPro} >ADD</button>
              </form>
            </div>
          </div>
        )
      }

      <div>
        <div>
          <ShowTask />
        </div>
      </div>
    </div>
  )
}

export default Data
