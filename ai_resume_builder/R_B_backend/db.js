const mongoose = require("mongoose");


const Schema = mongoose.Schema;
//no need to import objectId as we are not using it in schema


const ResumeSchema = new Schema({
  //personnel detail 
  title: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  themeColor: {
    type: String,
    trim: true,
    default: "blue",
  },

  //summery
  summery:{
    type: String,
    trim: true,
    default:" ",
  },

  //db will have multiple experience
  experience: [
    {
      
      title: { type: String },
      companyName: { type: String },
      city: { type: String },
      state: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      projectName:{ type:String},
      //currentlyWorking: { type: Boolean },//later upadate in Experience.jsx when false show end date when true don't show end date
      workSummery: { type: String }
    }
  ],

  //db will have multiple education

  education: [
    {
      
      universityName: { type: String },
      degree: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      
    }
  ],

  //skills
  skills: {type:String}//data is in html <li><ul> format
  
});


//module.exports = mongoose.model('Resume', ResumeSchema);

const ResumeModel = mongoose.model('Resume', ResumeSchema);

module.exports = { ResumeModel: ResumeModel };

{/**
When to use trim: true:
It automatically removes extra spaces at the beginning and end of strings when saving to MongoDB.
Use it for fields that:
Store user input (e.g. name, email, phone, address)
Are used for searching/filtering
Should not have leading/trailing spaces
*/}
