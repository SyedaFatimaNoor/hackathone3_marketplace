"use client"

import { useState } from 'react';  

const Contact: React.FC = () => {  
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');  
  const [message, setMessage] = useState('');  
  const [submitted, setSubmitted] = useState(false);  

  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault();  
     
    setSubmitted(true);  
  };  

  return (  
    <div className="max-w-4xl mx-auto px-4 py-8">   
      {submitted ? (  
        <div className="text-green-500 text-center">  
          Thank you for your message! We&#39;ll get back to you soon.  
        </div>  
      ) : (  
        <form onSubmit={handleSubmit} className="space-y-4">  
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="message">  
              Message  
            </label>  
            <textarea  
              id="message"  
              value={message}  
              onChange={(e) => setMessage(e.target.value)}  
              required  
              className="mt-1 block w-full h-48 border border-gray-300 rounded-md shadow-sm p-2"  
            />  
          </div>  
          <div>  
            <button  
              type="submit"  
              className="w-full bg-[#2A254B] text-white font-semibold py-2 rounded-md hover:bg-[#2a254b6b]"  
            >  
              Send Message  
            </button>  
          </div>  
        </form>  
      )}  
    </div>  
  );  
};  

export default Contact;
