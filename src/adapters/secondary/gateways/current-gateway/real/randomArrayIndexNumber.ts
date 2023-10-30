import { ArrayIndexPicker } from "../fake/fakeCurrentQuestionGateway";

export class RandomArrayIndexPicker implements ArrayIndexPicker {
  pick<T>(array: Array<T>): number {
    return Math.floor(Math.random() * array.length);
  }
}
