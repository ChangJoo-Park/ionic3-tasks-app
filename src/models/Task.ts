export class Task {
  title: string;
  note: string = '';
  userId: string;
  dueTo: number = 0;
  done: boolean = false;
  // Date
  createdAt: number = (new Date()).getTime();
  updatedAt: number = (new Date()).getTime();

  constructor(title: string, note: string, userId: string) {
    this.title = title || '';
    this.note = note || '';
    this.userId = userId;
  }

  toJSON() {
    return {
      title: this.title,
      note: this.note,
      userId: this.userId,
      dueTo: this.dueTo,
      done: this.done,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
