class ApiError extends Error {
    constructor (
        statusCode,msg = "Something went wrong",errors =[],stack=""){
            super(msg) //as we are using extended error class 
            this.statusCode = statusCode
            this.data = null
            this.msg = msg
            this.success = false
            this.errors = errors
            
            //if stack is present than populate
            if(stack){
                this.stack = stack
            }
            else{
                Error.captureStackTrace(this,this.constructor)
            }
        }
}

export {ApiError}