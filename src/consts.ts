export enum Actions {
  IS_LOADING = "IS_LOADING",
  ACTIVE = "ACTIVE",
  START = "START",
  NEXT = "NEXT",
  OPTION_SELECTED = "OPTION_SELECTED",
  ERROR = "ERROR",
}
export interface QuestionInterface {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
export type ActionsTypes =
  | { type: Actions.IS_LOADING }
  | { type: Actions.ACTIVE; payload: QuestionInterface[] }
  | { type: Actions.NEXT }
  | { type: Actions.START }
  | {
      type: Actions.OPTION_SELECTED;
      payload: { points: number; correctOption: number; selected: number };
    }
  | { type: Actions.ERROR, payload: string };
