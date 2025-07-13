import React, { useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../../../context/ResumeContext';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { API_URL } from '../../../config';

function Educational({ setEnableNext }) {
  const { resumedata, setresumedata } = useContext(ResumeContext);
  const [loading, setloading] = useState(false);
  const { resumeid } = useParams();


  useEffect(() => {
    setEnableNext(false);
  }, []);

  const AddnewEducation = () => {
    const newEductaion = {
      universityName: '',
      startDate: '',
      endDate: '',
      degree: '',
      major: '',
    };

    setresumedata({
      ...resumedata,
      education: [...(resumedata.education || []), newEductaion]
    });
  }

  const RemoveEducation = () => {
    const updatedEducation = [...(resumedata.education || [])];

    if (updatedEducation.length > 0) {
      updatedEducation.pop(); // Remove the last item //next update remove button should be with each section
      setresumedata({
        ...resumedata,
        education: updatedEducation
      });
    } else {
      toast("No education to remove.");
    }
  }
  const handleInputChange = (index, e) => {

    const { name, value } = e.target;
    const updatedEducation = [...(resumedata.education || [])]; //education is an array in db //If resumedata.education exists and is truthy (i.e., not null, undefined, or false), use it. Otherwise, use an empty array [].

    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };

    setresumedata({
      ...resumedata,
      education: updatedEducation
    })
  };

  const onSave = () => {
    if (resumedata?.education?.length > 0) {
      uploaddata();
    }
    else {
      toast("enter at least 1 education before saving")
    }

  }

  const uploaddata = async () => {
    setEnableNext(true);//when the first save happens next button appears
    setloading(true);
    try {
      const response = await axios.put(`${API_URL}/user/resumes/${resumeid}`, {
        education: resumedata.education,
      });

      if (response.status === 200) {
        setloading(false);
        setEnableNext(true);
        toast("education updated");
      }
    } catch (e) {
      console.error("Error uploading data", e);
      setloading(false);
    }

  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Educational Details</h2>

        <div>
          {/*index is the number */}
          {(resumedata.education|| []).map((_, index) => (
            //item is not used in this code as the first arugument of map we should write it or in place of it write _

            <AddEducation
              key={index}
              index={index}
              resumedata={resumedata}
              handleInputChange={handleInputChange}
            />
          ))}

        </div>

        <Button onClick={AddnewEducation} variant="outline" className="mt-4" >+ Add More</Button>
        <Button variant="outline" onClick={RemoveEducation} className="text-primary mx-2"> - Remove</Button>

        <div>
          <Button disabled={loading} onClick={() => onSave()} className="mt-2">
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>

      </div>
    </div>
  )
};

function AddEducation({ resumedata, index, handleInputChange}) {

  return (
    <div>
      <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
        <div>
          <label className='text-xs'>Institution Name</label>
          <Input name="universityName" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.education[index]?.universityName} /> {/**can use item?.title in place of resumedata?.experience[index]?.title but have to pass item from .map */}
        </div>
        <div>
          <label className='text-xs'>degree</label>
          <Input name="degree" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.education[index]?.companyName} />
        </div>
        <div>
          <label className='text-xs'>Start Date</label>
          <Input type="date" name="startDate" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.education[index]?.startDate} />
        </div>
        <div>
          <label className='text-xs'>End Date</label>
          <Input type="date" name="endDate" onChange={(e) => handleInputChange(index, e)} defaultValue={resumedata?.education[index]?.endDate} />
        </div>
      </div>

    </div>
  );
}
export default Educational
