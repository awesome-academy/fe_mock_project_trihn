import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@/app/utils/enum';

const themeSlice = createSlice({
  name: 'theme',
  initialState: Theme.LIGHT,
  reducers: {
    setCurrentTheme: (_, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { setCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;
