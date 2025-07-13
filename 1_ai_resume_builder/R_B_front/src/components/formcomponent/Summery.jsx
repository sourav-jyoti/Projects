import React, { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import {Button} from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {chatSession} from '../../google/Aimodel'
import { API_URL } from '../../../config';

export default function Summery({ setEnableNext }) {
  const { resumedata,setresumedata} = useContext(ResumeContext);
  const [summery, setsummery] = useState();
  const [loading,setloading]=useState(false);
  const { resumeid } = useParams();

  useEffect(() => {
    setEnableNext(false);
  }, []);
  //This ensures it's only called once when the component mounts as from parent i.e previous page it is true now in this page initially when loads it will be false

  //when summery changes below code runs and the resumedata is updated
  useEffect(() => {
    summery&&setresumedata({
      ...resumedata,summery:summery
    })
    
  }, [summery]);

  const uploaddata = async () => {
    setloading(true);
    try {
      const response = await axios.put(`${API_URL}/user/resumes/${resumeid}`, {
        summery: resumedata.summery,
      });

      if(response.status === 200){
        setloading(false);
        setEnableNext(true);
        toast("summery updated");
      }
    } catch (e) {
      console.error("Error uploading data", e);
      setloading(false);
    }

  }

//fetching the jobtitle

const GenerateAiSummery = async()=>{
  setloading(true);
  const prompt = `job title: ${resumedata?.jobTitle},depending on the job title give me exact 4-5 lines summery for my resume .(condition : no need to give variations or any extra information just give 4-5 lines ready to copy summary`;
  const result = await chatSession.sendMessage(prompt);
  setsummery(result.response.text());
  setloading(false);

}

  const onSave=(e)=>{

    e.preventDefault();
    uploaddata();
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg px-1'>Summary</h2>
        <p className='mt-2 px-1'>Add summery using Ai</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button variant="outline" type="button" size="sm" className="border-primary text-primary flex gap-2" onClick={()=>GenerateAiSummery()}>Generate from AI</Button>
                {/* above in the button we mentioned type button otherwise on clicking submit button will be called */}
            </div>
           
            <Textarea className="mt-5" required value={summery ?? resumedata?.summery ?? ''}  onChange={(e)=>setsummery(e.target.value)}/>

            <div className='mt-2 flex justify-end'>
              <Button type="submit" >
              {loading?<LoaderCircle className='animate-spin' />:'Save'}
              </Button>
            </div>

        </form>
      </div>
    </div>
  )
}

{/**
<Textarea className="mt-5" required value={summery ?? resumedata?.summery ?? ''}  onChange={(e)=>setsummery(e.target.value)}/>
//value={summery ?? resumedata?.summery ?? ''} ->//responsible for showing the latest update of the summery like generating using ai before we made it deafult but it shows only the initial value
//onChange={(e)=>setsummery(e.target.value) ->//if we change anything in the text area by ourselves than it update setsummery
  */}