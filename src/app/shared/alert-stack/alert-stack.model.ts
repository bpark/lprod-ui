export class AlertStackModel {
  alertMessages: AlertMessage[] = [];

  public static withDangerMessage(text: string): AlertStackModel {
    const alertStackModel = new AlertStackModel();
    alertStackModel.addDangerMessage(text);

    return alertStackModel;
  }

  public static withSuccessMessage(text: string): AlertStackModel {
    const alertStackModel = new AlertStackModel();
    alertStackModel.addDangerMessage(text);

    return alertStackModel;
  }

  public addDangerMessage(text: string) {
    const alertMessage = new AlertMessage(text, 'alert-danger');
    this.alertMessages.push(alertMessage);
  }

  public addSuccessMessage(text: string) {
    const alertMessage = new AlertMessage(text, 'alert-success');
    this.alertMessages.push(alertMessage);
  }

  public clear() {
    if (this.alertMessages.length > 0) {
      this.alertMessages = [];
    }
  }

  constructor() {}
}

export class AlertMessage {
  constructor(public text: string, public alertClass: string) {}
}
