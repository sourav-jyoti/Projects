import React from 'react'
import { Link } from 'react-router-dom'
import { FileEdit, Calendar } from 'lucide-react'

function ResumeCard({ resume }) {
  // Get the first letter of the title
  const firstLetter = resume?.title?.charAt(0).toUpperCase() || 'R'
  
  // Generate a consistent background color based on the title
  const colors = [
    'from-blue-300 to-blue-500',
    'from-emerald-300 to-emerald-600',
    'from-violet-300 to-violet-600',
    'from-amber-300 to-amber-600',
    'from-rose-300 to-rose-600',
    'from-cyan-300 to-cyan-600'
  ]
  
  // Use the first character's charCode as a seed for selecting a color
  const colorIndex = firstLetter.charCodeAt(0) % colors.length
  const gradientColor = colors[colorIndex]
  
  // Format creation date if available (assuming there's a createdAt field)
  const formattedDate = resume?.createdAt 
    ? new Date(resume.createdAt).toLocaleDateString() 
    : 'Recent'

  return (
    <Link to={`/${resume._id}/EditResume`}>
      <div className="group rounded-xl overflow-hidden border border-muted h-[280px] w-[200px] flex flex-col 
                     hover:shadow-lg hover:scale-103 transition-all duration-300">
        
        {/* Card Header with gradient background */}
        <div className={`h-3/5 bg-gradient-to-br ${gradientColor} flex items-center justify-center relative`}>
          <span className="text-white text-5xl font-bold">{firstLetter}</span>
          
          {/* Edit indicator */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full opacity-0 
                        group-hover:opacity-100 transition-opacity">
            <FileEdit className="h-4 w-4 text-white" />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="h-2/5 p-4 flex flex-col justify-between bg-white">
          <h2 className="font-medium text-base line-clamp-2" title={resume?.title}>
            {resume?.title || 'Untitled Resume'}
          </h2>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ResumeCard