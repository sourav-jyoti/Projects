import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';


export default function EducationalPreview() {
    const { resumedata} = useContext(ResumeContext);

  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2' style={{ color:resumedata?.themeColor }} >Education</h2>
    <hr style={{ borderColor:resumedata?.themeColor }} />

    {resumedata?.education?.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold' style={{ color:resumedata?.themeColor }}> {education.universityName} </h2>
            <h2 className='text-xs flex justify-between'>{education?.degree} 
            <span>{education?.startDate} - {education?.endDate}</span>
            </h2>
        </div>
    ))}

    </div>
  )
}

/**
 {resumedata?.education?.map((education,index)=>(..) // why ? is used otherwise gives error
 */