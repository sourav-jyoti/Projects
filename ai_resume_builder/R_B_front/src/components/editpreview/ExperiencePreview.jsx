import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';

export default function ExperiencePreview() {
  const { resumedata } = useContext(ResumeContext);

  return (
    <div>
      <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumedata?.themeColor }}>
          Professional Experience
        </h2>
        <hr style={{ borderColor: resumedata?.themeColor }} />

        {resumedata?.experience?.map((experience, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold' style={{ color: resumedata?.themeColor }}>{experience?.title}</h2>
            <h2 className='text-xs flex justify-between'>
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate}
                {(experience?.currentlyWorking || experience?.endDate !== '') && experience?.startDate !== '' && ' To '} {/**makes sure to is displayed only when experience is != '' */}
                {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
            </h2>
            <p className='text-sm mt-1'>
              {experience?.workSummery}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}