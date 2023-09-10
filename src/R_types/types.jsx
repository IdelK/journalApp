//los tipos de acciones aparecen en reduxDevTool/Actions
export const types = {
  login: "[Auth] Login ",
  logout: "[Auth] Logout ",

  iuSetError: "[UI] Set Error",
  iuRemoveError: "[UI] Remove Error",

  uiStartLoading: "[UI] Start Loading",
  uiFinishLoading: "[UI] Finish Loading",

  notesAddNew:    "[Notes] New note",
  notesActive:    "[Notes] Set active note",
  notesLoad:      "[Notes] Load notes",
  notesUpdate:    "[Notes] Update note",
  notesFileUrl:   "[Notes] Update image url",
  notesDelete:    "[Notes] Delete note",
  notesLogoutCleaning: "[Notes] Logout Cleaning",
};
