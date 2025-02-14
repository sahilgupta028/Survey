import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  answers: { type: Object, required: true },
  status: { type: String, required: true },
});

const SurveyModel = mongoose.models.Survey || mongoose.model("Survey", SurveySchema);

export { SurveyModel };
