import React, { useContext } from 'react'
import { ResumeContext } from "../../../context/ResumeContext";

export default function PersonalDetailPreview() {
  const { resumedata } = useContext(ResumeContext);


  return (
    <div>
      <h2 className='font-bold text-xl text-center' style={{ color: resumedata?.themeColor }}>
        {resumedata?.firstName} {resumedata?.lastName}
      </h2>

      <h2 className='text-center text-sm font-medium'>{resumedata?.jobTitle}</h2>

      <h2 className='text-center font-normal text-xs' style={{ color: resumedata?.themeColor }}>{resumedata?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='font-normal text-xs' style={{ color: resumedata?.themeColor }}>{resumedata?.phone}</h2>
        <h2 className='font-normal text-xs' style={{ color: resumedata?.themeColor }}>{resumedata?.email}</h2>
      </div>
      <hr className='border-[1.5px] my-2' style={{ borderColor: resumedata?.themeColor }} />
    </div>
  )
}
