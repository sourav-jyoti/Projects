import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';

export default function SummeryPreview() {

    const { resumedata} = useContext(ResumeContext);

  return (
    <div>
    <p className='text-xs'>
        {resumedata?.summery}
    </p>
    </div>
  )
}
