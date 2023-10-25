export class Task {
  title: string;
  description: string;
  date: Date;
  status: string;

  constructor(title = '', description = '', date = new Date(), status = '') {
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
  }
}
