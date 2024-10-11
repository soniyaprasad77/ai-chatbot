import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatResponse {
  summary?: string;
  result_text?: string;
  result_table_path?: string;
  result_visualization_path?: string;
  error?: string;
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
