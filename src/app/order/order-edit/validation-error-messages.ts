export class ValidationErrorMessages {

  private static glueAmount = {
    required: 'Die Eingabe darf nicht leer sein',
    min: 'Der Wert muss gößer 10 sein'
  };

  static getErrorText(id: string, error: string) {
    const definition = this[id];
    console.log('definition: ', definition);
    let errorText;
    if (definition !== undefined) {
      errorText = definition[error];
    }

    return errorText !== undefined ? errorText : 'Die Eingabe ist ungültig';
  }
}


