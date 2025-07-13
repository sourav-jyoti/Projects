import React, { useState,useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner"
import axios from 'axios';
import { API_URL } from '../../../config';

function PersonalDetail({ setEnableNext }) {
  const { resumedata, setresumedata } = useContext(ResumeContext);
  const [loading, setloading] = useState(false);
  const { resumeid } = useParams();


  const uploaddata = async () => {
    setloading(true);
    try {
      const response = await axios.put(`${API_URL}/user/resumes/${resumeid}`, resumedata);

      if(response.status === 200){
        setloading(false);
        setEnableNext(true);
        toast("Detailed updated");
      }
    } catch (e) {
      console.error("Error uploading data", e);
      setloading(false);
    }

  }

  const handleInputChange = (e) => {
    setEnableNext(false)

    const { name, value } = e.target;

    setresumedata({
      ...resumedata,
      [name]: value
    })

  }

  const onSave = (e) => {

    e.preventDefault();//prevents from refresing page and also prevents data to go in the url on clicking save 

    uploaddata();
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>
      
        <form onSubmit={onSave}>
          <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
              <label className='text-sm'>First Name</label>
              <Input name="firstName" defaultValue={resumedata?.firstName} required onChange={handleInputChange} />
            </div>
            <div>
              <label className='text-sm'>Last Name</label>
              <Input name="lastName" defaultValue={resumedata?.lastName} required onChange={handleInputChange} />
            </div>
            <div className='col-span-2'>
              <label className='text-sm'>Job Title</label>
              <Input name="jobTitle" defaultValue={resumedata?.jobTitle} required onChange={handleInputChange} />
            </div>
            <div className='col-span-2'>
              <label className='text-sm'>Address</label>
              <Input name="address" defaultValue={resumedata?.address} required onChange={handleInputChange} />
            </div>
            <div>
              <label className='text-sm'>Phone</label>
              <Input name="phone" defaultValue={resumedata?.phone} required onChange={handleInputChange} />
            </div>
            <div>
              <label className='text-sm'>Email</label>
              <Input name="email" defaultValue={resumedata?.email} required onChange={handleInputChange} />
            </div>
          </div>
          <div className='mt-5 flex justify-end'>
            <Button type="submit" > {loading ? <Loader2 className='animate-spin'/>:'Save'}</Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default PersonalDetail

{/**
  <Input name="email" required onChange={handleInputChange} /> 
  function of name : The name attribute assigns a unique identifier to the input field. When a form is submitted, the browser uses the name attribute to create key-value pairs representing the input's data
  


    const handleInputChange = (e) => { 
Defines a function named handleInputChange that takes an event (e) as an argument
    const {name,value} = e.target;
Extracts the name and value from the event's target (i.e., the input field that triggered the change).   
    setresumedata({
      ...resumedata,
      [name]:value
    })
Updates the resumedata state:
Uses the spread operator (...resumedata) to keep the existing data.
Dynamically updates the field ([name]) with the new value.
  
.

  */}