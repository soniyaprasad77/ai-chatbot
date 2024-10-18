import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    question: String,
    answer: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// const Chat = mongoose.model('Chat', chatSchema);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
