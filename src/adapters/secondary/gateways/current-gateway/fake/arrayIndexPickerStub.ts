import { ArrayIndexPicker } from "./fakeCurrentQuestionGateway";

export class ArrayIndexPickerStub implements ArrayIndexPicker {
  private _selectedIndex: number = 0;
  pick<T>(array: Array<T>): number {
    return this._selectedIndex;
  }

  set selectedIndex(value: number) {
    this._selectedIndex = value;
  }
}
