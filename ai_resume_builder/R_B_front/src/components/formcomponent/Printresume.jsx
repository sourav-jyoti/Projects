import React from 'react'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import ResumePreview from "../../components/ui/ResumePreview"
const Printresume = () => {

  const handlePrint = () => {
    window.print();
{/**check index.css how only the ResumePreview is only printed */}
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handlePrint} className="flex items-gap-2">
        <Printer className="w-4 h-4" />
        Print Resume
      </Button>

      {/* Hidden ResumePreview that will be used as source for printing */}
      <div className='print:block hidden' id="print-area">
        <div>
          <ResumePreview />
        </div>
      </div>
    </div>

  )
}

export default Printresume

