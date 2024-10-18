import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatResponse {
  answers: string;
}

interface ChatState {
  savedResponses: ChatResponse[];
}

const initialState: ChatState = {
  savedResponses: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveResponse: (state, action: PayloadAction<ChatResponse>) => {
      state.savedResponses.push(action.payload);
    },
  },
});

export const { saveResponse } = chatSlice.actions;
export default chatSlice.reducer;
