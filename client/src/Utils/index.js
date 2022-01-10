import AddIcon from "../Assests/AddIcon";
import CalenderIcon from "../Assests/CalenderIcon";
import GraphIcon from "../Assests/GraphIcon";
import NoteIcon from "../Assests/NoteIcon";

export const ICON_NAME = {
  NoteIcon: NoteIcon,
  CalenderIcon: CalenderIcon,
  AddIcon: AddIcon,
  GraphIcon: GraphIcon,
};

export const getCurrentDate = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const str = dateLocal.toISOString().slice(0, 10).replace("T", " ");
  return str;
};
