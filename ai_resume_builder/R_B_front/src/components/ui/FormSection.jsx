import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Educational from "../formcomponent/Educational";
import Experience from "../formcomponent/Experience";
import PersonalDetail from "../formcomponent/PersonalDetail";
import Skills from "../formcomponent/Skills";
import Summery from "../formcomponent/Summery";
import Printresume from "../formcomponent/Printresume";

function FormSection() {
  const [sectionindex, setsectionindex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  // Calculate progress percentage (6 sections total)
  const totalSections = 6;
  const progress = Math.round((sectionindex / totalSections) * 100);

  return (
    <div>
      {/* Progress Bar */}
      <div className="mt-5">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1 text-center">
          Step {sectionindex} of {totalSections} ({progress}%)
        </p>
      </div>

      {/* Theme and Navigation Buttons */}
      <div className="flex justify-between mt-5">
        <Button variant="outline">Theme</Button>
        <div className="flex gap-1">
          {sectionindex > 1 && (
            <Button onClick={() => setsectionindex((curr) => curr - 1)}>
              <ArrowLeft /> Prev
            </Button>
          )}
          {sectionindex < 6 && (
            <Button
              disabled={!enableNext}
              onClick={() => setsectionindex((curr) => curr + 1)}
            >
              <ArrowRight /> Next
            </Button>
          )}
        </div>
      </div>

      {/* Form Sections */}
      {sectionindex === 1 && <PersonalDetail setEnableNext={setEnableNext} />}
      {sectionindex === 2 && <Summery setEnableNext={setEnableNext} />}
      {sectionindex === 3 && <Experience setEnableNext={setEnableNext} />}
      {sectionindex === 4 && <Educational setEnableNext={setEnableNext} />}
      {sectionindex === 5 && <Skills setEnableNext={setEnableNext} />}
      {sectionindex === 6 && <Printresume />}
    </div>
  );
}

export default FormSection;