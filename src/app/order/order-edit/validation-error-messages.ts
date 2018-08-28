export class ValidationErrorMessages {

  private static glueAmount = {
    required: 'Die Eingabe darf nicht leer sein',
    min: 'Der Wert muss gößer 10 sein'
  };

  private static additionalLength = {
    required: 'Die Eingabe darf nicht leer sein',
    min: 'Der Wert muss gößer 5 sein'
  };

  private static hardenerPercentage = {
    required: 'Die Eingabe darf nicht leer sein',
    min: 'Der Wert muss gößer oder gleich 0 sein',
    max: 'Der Wert darf nicht größer als 100 sein'
  };

  private static laminationStrength = {
    required: 'Die Eingabe darf nicht leer sein',
    min: 'Der Wert muss gößer oder gleich 0 sein',
    max: 'Der Wert darf nicht größer als 100 sein'
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


