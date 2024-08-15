import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

function App() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful!');
        // Optionally, redirect the user to the login page or dashboard
        // window.location.href = '/login';
      } else {
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed: An error occurred.');
    }
  };

  return (
    <div className='h-[100vh] flex flex-col items-center justify-center text-white'>
      <div className='bg-blue-600 px-6 py-6 w-80'>
        <div className={`transition-transform duration-500`}>
          <h2 className='text-3xl font-bold pb-6 text-center'>Register</h2>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className='w-full relative'>
              <input 
                className="border border-white w-full rounded-full py-2 px-4 my-2 bg-transparent" 
                placeholder='Firstname' 
                type="text" 
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <FaUser className='absolute top-[40%] right-3'/>
            </div>
            <div className='w-full relative'>
              <input 
                className="border border-white w-full rounded-full py-2 px-4 my-2 bg-transparent" 
                placeholder='Lastname' 
                type="text" 
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <FaUser className='absolute top-[40%] right-3'/>
            </div>
            <div className='w-full relative'>
              <input 
                className="border border-white w-full rounded-full py-2 px-4 my-2 bg-transparent" 
                placeholder='Email' 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <MdMail className='absolute top-[40%] right-3'/> 
            </div>
            <div className='w-full relative'>
              <input 
                className="border border-white w-full rounded-full py-2 px-4 my-2 bg-transparent" 
                placeholder='Password' 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FaLock className='absolute top-[40%] right-3'/>
            </div>
            <button type="submit" className='my-2 py-2 w-full rounded-full bg-blue-500'>Register</button>
            <span>Already have an account?<span className="text-blue-300 cursor-pointer"> Login</span></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
