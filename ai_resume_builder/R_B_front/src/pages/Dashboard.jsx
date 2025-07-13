import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddResume from '../components/ui/addresume'
import ResumeCard from '../components/ui/resumecard'
import { LoaderCircle, FileText } from 'lucide-react'
import { API_URL } from '../../config'

function Dashboard() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getAllResumes = async () => {
      try {
        const response = await axios.get(`${API_URL}/resumes`)
        setResumes(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data", err)
        setError("Failed to load your resumes. Please try again.")
        setLoading(false)
      }
    }

    getAllResumes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Resumes</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <LoaderCircle className="animate-spin h-10 w-10 text-primary" />
          <p className="text-muted-foreground">Loading your resumes...</p>
        </div>
      ) : (
        <>
          {resumes.length === 0 && !error ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <h3 className="text-lg font-medium mb-2">No resumes created yet</h3>
              <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <AddResume />
              {resumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard