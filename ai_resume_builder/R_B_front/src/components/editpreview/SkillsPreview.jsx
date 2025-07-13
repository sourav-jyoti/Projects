import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';

export default function SkillsPreview() {
  const { resumedata } = useContext(ResumeContext);

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumedata?.themeColor }}>
        Skills
      </h2>
      <hr style={{ borderColor: resumedata?.themeColor }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        <div
          className='text-xs rendered-html'
          dangerouslySetInnerHTML={{ __html: resumedata?.skills }}
        />
      </div>
    </div>
  );
}
