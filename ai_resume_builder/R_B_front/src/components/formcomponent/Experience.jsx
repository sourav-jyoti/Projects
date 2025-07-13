import React, { useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../../../context/ResumeContext';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
//import RichTextEditor from '@/components/RichTextEditor';//next update
import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '../../google/Aimodel'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { API_URL } from '../../../config';

export default function Experience({ setEnableNext }) {
  const { resumedata, setresumedata } = useContext(ResumeContext);
  const [loading, setloading] = useState(false);
  const { resumeid } = useParams();


  useEffect(() => {
    setEnableNext(false);
  }, []);



  {/**
  Create a new empty experience object.
  Add it to the resumedata.experience array.
  Update the state using setresumedata, which causes the UI to re-render and show a new editable experience section. 
  */}
  const AddnewExperience = () => {
    const newExperience = {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      projectName: '',
      workSummery: ''
    };

    setresumedata({
      ...resumedata,
      experience: [...(resumedata.experience || []), newExperience]
    });
  };


  const RemoveExperience = () => {
    const updatedExperience = [...(resumedata.experience || [])];

    if (updatedExperience.length > 0) {
      updatedExperience.pop(); // Remove the last item //next update remove button should be with each section
      setresumedata({
        ...resumedata,
        experience: updatedExperience
      });
    } else {
      toast("No experience to remove.");
    }
  }

  const handleInputChange = (index, e) => {

    const { name, value } = e.target;
    const updatedExperience = [...(resumedata.experience || [])]; //experience is an array in db //If resumedata.experience exists and is truthy (i.e., not null, undefined, or false), use it. Otherwise, use an empty array [].

    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: value,
    };

    setresumedata({
      ...resumedata,
      experience: updatedExperience
    })
  };

  const handleWorkSummeryChange = (index, value) => {
    const updatedExperience = [...(resumedata.experience || [])];

    updatedExperience[index] = {
      ...updatedExperience[index],
      workSummery: value,
    };

    setresumedata({
      ...resumedata,
      experience: updatedExperience,
    })

  };

  const onSave = () => {
    if (resumedata?.experience?.length > 0) {
      uploaddata();
    }
    else {
      toast("enter at least 1 experience before saving")
    }

  }

  const uploaddata = async () => {
    setEnableNext(true);//when the first save happens next button appears
    setloading(true);
    try {
      const response = await axios.put(`${API_URL}/user/resumes/${resumeid}`, {
        experience: resumedata.experience,
      });

      if (response.status === 200) {
        setloading(false);
        setEnableNext(true);
        toast("experience updated");
      }
    } catch (e) {
      console.error("Error uploading data", e);
      setloading(false);
    }

  }

  const GenerateAiSummery = async (index) => {

    const d = resumedata?.experience[index];
    if (d?.projectName != '' && d?.companyName != '' && d?.title != '') {
      setloading(true);
      const prompt = `Generate a 4-5 line professional experience summary using the following details:
                      Title: ${d?.title}
                      Company Name: ${d?.companyName}
                      short Project Detail: ${d?.projectName}
                      Focus on the role, responsibilities, key contributions, and any impact or achievements related to the project. Use a concise and professional tone.
                      condition : 1. give ready to copy text don't write any extra unneccessary things,
                                  2. don't add title and company name in summary
                                  3. Add numeric values,
                      `;

      const result = await chatSession.sendMessage(prompt);
      handleWorkSummeryChange(index, result.response.text());
      setloading(false);
    }
    else {
      toast("add projectName ,companyName,title");
    }

  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {/* item is the value, index is the number */}
          {(resumedata.experience || []).map((item, index) => (
            //item is not used in this code as the first arugument of map we should write it or in place of it write _

            <AddExperience
              key={index}
              index={index}
              resumedata={resumedata}
              handleInputChange={handleInputChange}
              handleWorkSummeryChange={handleWorkSummeryChange}
              GenerateAiSummery={GenerateAiSummery}


            />
          ))}

        </div>

        <Button onClick={AddnewExperience} variant="outline" className="mt-4" >+ Add Experience</Button>
        <Button variant="outline" onClick={RemoveExperience} className="text-primary mx-2"> - Remove</Button>

        <div>
          <Button disabled={loading} onClick={() => onSave()} className="mt-2">
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>

      </div>
    </div>
  )
};




function AddExperience({ resumedata, index, handleInputChange, handleWorkSummeryChange, GenerateAiSummery }) {

  return (
    <div>
      <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
        <div>
          <label className='text-xs'>Position Title*</label>
          <Input name="title" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.title} /> {/**can use item?.title in place of resumedata?.experience[index]?.title but have to pass item from .map */}
        </div>
        <div>
          <label className='text-xs'>Company Name*</label>
          <Input name="companyName" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.companyName} />
        </div>
        <div>
          <label className='text-xs'>Short Project Detail*</label>
          <Input name="projectName" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.projectName} />
        </div>
        <div>
          <label className='text-xs'>City</label>
          <Input name="city" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.city} />
        </div>
        <div>
          <label className='text-xs'>State</label>
          <Input name="state" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.state}
          />
        </div>
        <div>
          <label className='text-xs'>Start Date</label>
          <Input type="date" name="startDate" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.startDate} />
        </div>
        <div>
          <label className='text-xs'>End Date</label>
          <Input type="date" name="endDate" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.experience[index]?.endDate} />
        </div>

        <div className='col-span-2 '>
          <Button variant="outline" type="button" size="sm" className="border-primary text-primary flex my-5" onClick={() => GenerateAiSummery(index)}>
            Generate from AI
          </Button>

          <Textarea index={index} onChange={(e) => handleWorkSummeryChange(index, e.target.value)} required value={resumedata?.experience[index]?.workSummery ?? ''} />

        </div>


      </div>

    </div>
  );
}

{
  /**
   ✅ const handleInputChange = (index, e) => {
This is a function definition.
It takes:
 
index: the index of the experience block to update.
 
e: the event object from the input field change.
 
✅ const { name, value } = e.target;
Destructures e.target (the input element) to extract:
 
name: the name of the input field (title, companyName, etc.)
 
value: the new value the user typed
 
✅ const updatedExperience = [...(resumedata.experience || [])];
Creates a shallow copy of the experience array from state (resumedata).
 
Why the || []?
To ensure we don't get a runtime error if experience is undefined initially.
 
✅ updatedExperience[index] = { ...updatedExperience[index], [name]: value };
Updates the specific experience object at the given index:
 
Spreads the previous values (...updatedExperience[index])
 
Then overrides the field that changed using [name]: value
 
✅ setresumedata({ ...resumedata, experience: updatedExperience });
Finally, update the overall resume state:
 
Spread all previous data from resumedata
 
Replace the experience array with the newly updated one
 
This triggers React to re-render the UI with the updated form values.
*/

  /**update add rich texteditor inplace of text editor */
  /**update Unique Keys in .map(): If possible, use a unique ID instead of index for key, especially if you later allow removal by index. Using just index can cause weird bugs in some React re-renders.*/
}