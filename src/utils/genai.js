import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./constants";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default ai;
