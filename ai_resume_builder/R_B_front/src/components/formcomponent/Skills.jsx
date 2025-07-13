import React, { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '../../../context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { chatSession } from '../../google/Aimodel'
import { API_URL } from '../../../config';

function Skills() {
  const { resumedata, setresumedata } = useContext(ResumeContext);

  const [skills, setskills] = useState();
  const [loading, setloading] = useState(false);
  const { resumeid } = useParams();

  //when textarea changes below code runs and the resumedata is updated
  useEffect(() => {
    skills && setresumedata({
      ...resumedata,
      skills: skills
    })
  }, [skills]);


  const onSave = () => {
    if (resumedata?.skills?.length > 0) {
      uploaddata();
    }
    else {
      toast("enter skills")
    }

  }

  const uploaddata = async () => {
    setloading(true);
    try {
      const response = await axios.put(`${API_URL}/user/resumes/${resumeid}`, {
        skills: resumedata.skills,
      });

      if (response.status === 200) {
        setloading(false);
        toast("skills updated");
      }
    } catch (e) {
      console.error("Error uploading data", e);
      setloading(false);
    }

  }

  const GenerateAiSkills = async () => {

    //** 
    const formattedExperience = resumedata?.experience?.map((exp, index) => {
      return `(${index + 1})
      Title: ${exp.title}
      Company: ${exp.companyName}
      Project: ${exp.projectName}
      Summary: ${exp.workSummery}
      `;
    }).join("\n\n");

    const prompt = `Analyze the experience data provided below. Extract relevant technical skills.

    Experience Data:
    ${formattedExperience}
    
    **CRITICAL OUTPUT REQUIREMENTS:**
    1.  Generate RAW HTML source code for a list.
    2.  The entire response MUST start *exactly* with \`<ul>\` and end *exactly* with \`</ul>\`. NO characters before or after.
    3.  Categorize skills inside \`<li>\` tags (e.g., <li>Category: Skill1, Skill2</li>).
    4.  DO NOT include ANY markdown fences (\`\`\`html or \`\`\`), comments, explanations, apologies, or any text other than the raw HTML list itself. Your output must be *pure* HTML source.
    
    Example of **CORRECT** raw output format:
    <ul><li>Category1: SkillA</li><li>Category2: SkillB, SkillC</li></ul>
    
    Example of **INCORRECT** output:
    \`\`\`html
    <ul><li>Category1: SkillA</li></ul>
    \`\`\`
    Do NOT output anything like the incorrect example. Output ONLY the raw HTML like the correct example.`;

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text())

    let rawText = result.response.text();

    // --- Start Cleanup ---
    let cleanedHtml = rawText.trim(); // Remove leading/trailing whitespace

    // Remove potential markdown fences
    if (cleanedHtml.startsWith("```html")) {
      cleanedHtml = cleanedHtml.substring(7); // Remove ```html
      // Potentially remove the newline after the opening fence too
      if (cleanedHtml.startsWith('\n')) {
        cleanedHtml = cleanedHtml.substring(1);
      }
    }
    if (cleanedHtml.endsWith("```")) {
      cleanedHtml = cleanedHtml.substring(0, cleanedHtml.length - 3); // Remove ```
      // Potentially remove the newline before the closing fence too
      if (cleanedHtml.endsWith('\n')) {
        cleanedHtml = cleanedHtml.substring(0, cleanedHtml.length - 1);
      }
    }

    cleanedHtml = cleanedHtml.trim(); // Trim again after potential fence removal

    setskills(cleanedHtml);
    setloading(false);
  }

  const convertHTMLToText = (html) => {
    return html
      .replace(/<\/?ul>/g, '')                     // Remove <ul> and </ul>
      .replace(/<li>(.*?)<\/li>/g, '• $1')         // Replace <li>content</li> with • content
      .trim();                                     // Clean leading/trailing whitespace
  }


  return (
    <div>
      <div className='col-span-2 '>
        <Button variant="outline" type="button" size="sm" className="border-primary text-primary flex my-5" onClick={() => GenerateAiSkills()}>
          Generate from AI based on your experience
        </Button>

        <Textarea onChange={(e) => setskills(e.target.value)} required value={convertHTMLToText( skills ?? resumedata?.skills ?? '')} />

      </div>
      <div>
        <Button disabled={loading} onClick={() => onSave()} className="mt-2">
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills

{
  /**    
   * //since we are generating the skills based on the experience stored and since it is array which if we pass to gemini it will in the form object object so we to convert it into string
    //eg:

    [
  {
    title: "Frontend Developer",
    companyName: "TechCorp",
    ...
  },
  {
    title: "Backend Developer",
    companyName: "CodeWorks",
    ...
  }

  //(1)
    Title: Frontend Developer
    Company: TechCorp
    ...

    (2)
    Title: Backend Developer
    Company: CodeWorks
    ...
 
  */

  /**
   * in the skills.jsx when we enter something in the text area the html format gets disrupted
   */
}