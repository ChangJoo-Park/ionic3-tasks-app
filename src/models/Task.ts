export class Task {
  title: string;
  note: string = '';
  userId: string;
  dueDate: number = 0;
  done: boolean = false;
  // Date
  createdAt: number = (new Date()).getTime();
  updatedAt: number = (new Date()).getTime();

  constructor(title: string = '', note: string = '', userId: string, dueDate: string = '') {
    this.title = title;
    this.note = note;
    this.userId = userId;
    this.dueDate = dueDate === '' ? 0 : (new Date(dueDate)).getTime();
  }

  toJSON() {
    return {
      title: this.title,
      note: this.note,
      userId: this.userId,
      dueDate: this.dueDate,
      done: this.done,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
