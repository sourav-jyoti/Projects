import React, { useState } from 'react'
import { API_URL } from '../../../config'
import { Loader2, FileText, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

import axios from "axios"

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCreate = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${API_URL}/user/resumes`, { 
                title: resumeTitle 
            })
    
            if(response) {
                setLoading(false)
                window.location.href = `/${response.data._id}/EditResume`
            }
        } catch (error) {
            console.error("Error creating resume:", error.response?.data || error.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <div 
                className="p-6 border-2 border-dashed border-primary/40 rounded-xl h-[280px] w-[200px] 
                           bg-secondary/30 hover:bg-secondary/50 flex flex-col items-center justify-center gap-4
                           transition-all hover:scale-103 hover:shadow-lg cursor-pointer group"
                onClick={() => setOpenDialog(true)}
            >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-primary">Create New</p>
                    <p className="text-xs text-muted-foreground">Add a resume</p>
                </div>
            </div>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Create New Resume
                        </DialogTitle>
                        <DialogDescription>
                            Give your resume a title to help you identify it later.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <Input 
                            className="focus-visible:ring-primary" 
                            placeholder="e.g., Full Stack Developer Resume" 
                            value={resumeTitle}
                            onChange={(e) => setResumeTitle(e.target.value)}
                            autoFocus
                        />
                    </div>
                    
                    <DialogFooter className="flex justify-between sm:justify-between">
                        <Button 
                            variant="outline" 
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            disabled={!resumeTitle || loading} 
                            onClick={handleCreate}
                            className="gap-1"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
                            Create Resume
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume