//higher order function i.e a function that accepts function as parameter and function as return value

const asyncHandler  = (requestHandler) =>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}