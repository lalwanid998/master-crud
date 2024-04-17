import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Create() {
    const [id, setId] = useState(0);
    const [values, setValues] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the latest user ID from the API
        axios.get('http://localhost:3000/users')
            .then(res => {
                const latestUser = res.data[res.data.length - 1];
                // Increment the latest ID and set it
                setId(parseInt(latestUser.id) + 1);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Use the incremented ID for the new user
        const newUser = { ...values, id: `${id}` };
        axios.post('http://localhost:3000/users', newUser)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Add a User</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name :</label>
                        <input type='text' name='name' className='form-control' placeholder='Enter Name' onChange={e => setValues({...values,name:e.target.value})} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email :</label>
                        <input type='text' name='email' className='form-control' placeholder='Enter Email' onChange={e => setValues({...values,email:e.target.value})} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='phone'>Phone :</label>
                        <input type='text' name='phone' className='form-control' placeholder='Enter Phone' onChange={e => setValues({...values,phone:e.target.value})} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default Create