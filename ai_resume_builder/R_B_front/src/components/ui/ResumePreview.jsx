import React, { useContext } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';

import EducationalPreview from "../editpreview/EducationalPreview";
import ExperiencePreview from "../editpreview/ExperiencePreview";
import PersonalDetailPreview from "../editpreview/PersonalDetailPreview";
import SkillsPreview from "../editpreview/SkillsPreview";
import SummeryPreview from "../editpreview/SummeryPreview";


export default function ResumePreview() {
  const { resumedata} = useContext(ResumeContext);

  if (!resumedata) {
    return <div className="p-10 text-center">Loading ...</div>;//1
  }

  return (
    <div className="shadow-lg h-full p-14 border-t-15" style={{ borderTopColor: resumedata?.themeColor || "blue" }}> {/*2*/}
      <PersonalDetailPreview />
      <SummeryPreview />
      <ExperiencePreview />
      <EducationalPreview />
      <SkillsPreview />
    </div>
  );
}

{/**
1. since inside EditResume.jsx resumedata is set to null 
The useEffect hook runs after the first render.
The function fetchResume() is called inside useEffect, but React does not wait for it to complete before rendering. Instead:
The component renders with resumedata = null.
The effect runs asynchronously.
setresumedata(dummy); updates the state.
The component re-renders with the new data.
Child Components Render Immediately
ResumePreview renders before setresumedata(dummy); takes effect.
When ResumePreview tries to access resumedata.themeColor, resumedata is still null, leading to the error.  
Since you expect resumedata to be populated after useEffect runs, you can avoid the error in two ways:

Option 1: Add a Null Check (Best Practice)
This ensures that ResumePreview waits until resumedata is available:
if (!resumedata) {
  return <div className="p-10 text-center">Loading resume data...</div>;
}
This prevents the error and improves user experience by showing a loading message while data is fetched.

Option 2: Use an Empty Object as Default State
Modify EditResume.jsx:
const [resumedata, setresumedata] = useState({});
Now, resumedata is always an object, so themeColor lookup won't cause an error.

Which Approach is Better?
Option 1 (Null Check) is better because it explicitly handles the loading state and avoids rendering incomplete data.

Option 2 (Empty Object Default) works but may cause unexpected behavior if child components expect resumedata to be fully populated.



//2 <div className={`shadow-lg h-full p-14 border-t-[20px] border-t-${resumedata?.themeColor || 'blue'}-500`}>
// this line doesnot because tailwind doesnot support dynamic so we have to style*/}