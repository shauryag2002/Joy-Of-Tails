const ProductSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    checkIsAdmin(state, action) {
      return {
        isAdmin: action.payload,
      };
    },
    checkIsUser(state, action) {
      return {
        isUser: action.payload,
      };
    },
  },
});

export const { checkIsAdmin, checkIsUser } = AdminSlice.actions;

export default AdminSlice.reducer;
