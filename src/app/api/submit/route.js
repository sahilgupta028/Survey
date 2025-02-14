import connectMongo from "@/lib/mongodb";
import { SurveyModel } from "@/models/Survey";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();

    const { sessionId, answers, status } = await req.json();
    const survey = await SurveyModel.create({ 
        sessionId, 
        answers, 
        status 
    });
    return NextResponse.json({ message: "Survey submitted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit survey" }, { status: 500 });
  }
}


