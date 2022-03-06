import AddIcon from "../assests/AddIcon";
import CalenderIconLight from "../assests/CalenderIconLight";
import CalenderIconDark from "../assests/CalenderIconDark";
import CloseIcon from "../assests/CloseIcon";
import DeleteIcon from "../assests/DeleteIcon";
import GraphIcon from "../assests/GraphIcon";
import LinkIcon from "../assests/LinkIcon";
import NoteIcon from "../assests/NoteIcon";
import PlusIcon from "../assests/PlusIcon";
import TrashIcon from "../assests/TrashIcon";
import XIcon from "../assests/XIcon";

export const ICON_NAME = {
  AddIcon: AddIcon,
  CalenderIconLight: CalenderIconLight,
  CalenderIconDark: CalenderIconDark,
  CloseIcon: CloseIcon,
  DeleteIcon: DeleteIcon,
  GraphIcon: GraphIcon,
  LinkIcon: LinkIcon,
  NoteIcon: NoteIcon,
  PlusIcon: PlusIcon,
  TrashIcon: TrashIcon,
  XIcon: XIcon,
};

export const getCurrentDate = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const str = dateLocal.toISOString().slice(0, 10).replace("T", " ");
  return str;
};

export const calculateOneRepMax = (exercise) => {
  let oneRepMax = 0;
  for (let i = 0; i < exercise.weight.length; i++) {
    let newOneRepMax =
      exercise.weight[i] / (1.0278 - 0.0278 * exercise.reps[i]);
    oneRepMax = Math.max(newOneRepMax, oneRepMax);
  }
  return parseInt(oneRepMax);
};
