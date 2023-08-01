export enum Actions {
  IS_LOADING = "IS_LOADING",
  ACTIVE = "ACTIVE",
  START = "START",
  NEXT = "NEXT",
  OPTION_SELECTED = "OPTION_SELECTED",
  ERROR = "ERROR",
  FINISH_GAME = "FINISH_GAME",
  RESTART_GAME = "RESTART_GAME",
  TIMER = "TIMER",
}

export const TIME_PER_QUESTION = 20;
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
  | { type: Actions.ERROR }
  | { type: Actions.FINISH_GAME }
  | { type: Actions.RESTART_GAME }
  | { type: Actions.TIMER };

export type InitialStateType = {
  status: string;
  userPoints: number;
  questions: QuestionInterface[];
  index: number;
  answer: string | number;
  highScore: number;
  time: number;
};
