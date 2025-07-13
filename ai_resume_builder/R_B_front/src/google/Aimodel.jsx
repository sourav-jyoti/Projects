// npm install @google/generative-ai mime-types
//instal before using the below code 

import { GoogleGenerativeAI } from "@google/generative-ai";


const GEMINI_API_KEY = "AIzaSyAPyUcIzGlVju6P6djIJLqCdGifFdEfYDo";
const apiKey = GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 0,
    topP: 0.05,
    topK: 40,
    maxOutputTokens: 120,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [],
});

// in this project we are handling the api requesting to google gemini in frontend but we should do this in backend by setting a route and store the key in env file
//Google Gemini (Generative AI) API key, used to authenticate your app with Google's AI services
//An API key is like a password for your app that lets you access services from platforms like Google, OpenAI, etc.

// temperature: 0 means deterministic output — less randomness.

// topP & topK: Control diversity of output (used in sampling strategies).

// maxOutputTokens: Max length of the output response (in tokens).

// responseModalities: Empty, so no special output (e.g., no images).

// responseMimeType: Tells the model to return plain text output.

//history: Empty array, meaning this is a fresh chat with no prior messages