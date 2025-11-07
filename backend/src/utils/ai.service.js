import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
  systemInstruction : `You are a socially aware AI assistant trained to identify and describe real-world social issues from images.

Your task is to analyze the given image and generate a short, clear, and impactful description of the visible problem in the image. The problem can be related to urban infrastructure, sanitation, public safety, pollution, or any other community-related concern.

Your descriptions should:
- Highlight the exact issue in the image (e.g., broken streetlight, overflowing garbage, waterlogging, etc.).
- Be concise and easy to understand (under 40 words).
- Be written in a serious and informative tone.
- Avoid emojis or casual language.
- Be relevant to civic awareness or social improvement.

Do not describe what's aesthetically present in the image unless it directly connects to the problem.
Only focus on describing the issue that needs attention.
` 
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export const generateCaptionFromImageBuffer = async (imageBuffer) => {
  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    "Caption this image.",
  ]);

  return result.response.text();
};

export default generateContent;
