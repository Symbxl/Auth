import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({
        identifier: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const { jwt, user } = await response.json();
      localStorage.setItem('jwt', jwt);
      signIn(user, user.isAdmin);  
      if (user && user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      console.log(response.statusText)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('email')} placeholder="Email" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
