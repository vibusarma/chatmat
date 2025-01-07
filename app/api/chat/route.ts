import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Add introduction if asked about identity or capabilities
    const identityQuestions = [
      "who are you",
      "what are you", 
      "what's your name",
      "who is this",
      "introduce yourself",
      "what can you do",
      "help me",
      "what are your capabilities",
      "who created you",
      "who made you"
    ];

    if (identityQuestions.some(q => message.toLowerCase().includes(q))) {
      return NextResponse.json({ 
        message: `I am ChatMate, an AI-powered conversation assistant created by **Vibushana Sharma**. I can help you with:

- Answering questions on any topic
- Writing and reviewing code
- Math and scientific calculations
- Language translation
- Creative writing and brainstorming
- Analysis and explanations
- General conversation and chat

How can I assist you today?`
      });
    }
    
    // Enhanced prompt with context and guidelines
    const enhancedPrompt = `As ChatMate (created by **Vibushana Sharma**), please provide a helpful, accurate, and engaging response to: ${message}

Remember to:
- Be clear and concise
- Include relevant examples when helpful
- Format code blocks with proper syntax
- Break down complex topics
- Cite sources when appropriate`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}