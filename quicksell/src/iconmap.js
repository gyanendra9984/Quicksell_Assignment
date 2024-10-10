import { ReactComponent as UrgentPriorityIcon } from "./icons_FEtask/SVG - Urgent Priority grey.svg";
import { ReactComponent as HighPriorityIcon } from "./icons_FEtask/Img - High Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "./icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as LowPriorityIcon } from "./icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as NonePriorityIcon } from "./icons_FEtask/No-priority.svg";
import { ReactComponent as ProgressIcon } from "./icons_FEtask/in-progress.svg";
import { ReactComponent as TodoIcon } from "./icons_FEtask/To-do.svg";
import { ReactComponent as DoneIcon } from "./icons_FEtask/Done.svg";
import { ReactComponent as CancelIcon } from "./icons_FEtask/Cancelled.svg";
import { ReactComponent as BacklogIcon } from "./icons_FEtask/Backlog.svg";
import { ReactComponent as ThdotIcon } from "./icons_FEtask/3 dot menu.svg";
import { ReactComponent as PlusIcon } from "./icons_FEtask/add.svg";

export const priorityIconMap = {
  4: UrgentPriorityIcon,
  3: HighPriorityIcon,
  2: MediumPriorityIcon,
  1: LowPriorityIcon,
  0: NonePriorityIcon,
  Backlog: BacklogIcon,
  Todo: TodoIcon,
  "In progress": ProgressIcon,
  Done: DoneIcon,
  Cancel: CancelIcon,
  "3dot": ThdotIcon,
  Plus: PlusIcon,
};
