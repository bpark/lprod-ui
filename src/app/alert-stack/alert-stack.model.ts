export class AlertStackModel {
  alertMessages: AlertMessage[] = [];

  public static withDangerMessage(text: string): AlertStackModel {
    const alertStackModel = new AlertStackModel();
    const alertMessage = new AlertMessage(text, 'alert-danger');
    alertStackModel.alertMessages.push(alertMessage);

    return alertStackModel;
  }

  constructor() {}
}

export class AlertMessage {
  constructor(public text: string, public alertClass: string) {}
}
