// Task 1

function DeprecatedMethod(reason: string, alternative: string) {
  return function<T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>
  ){
    if (context.kind !== 'method') throw new Error('Method-only decorator');
    
    const message = `Метод ${String(context.name)} є застарілим.` +
            (reason ? ` Причина: ${reason}.` : '') +
            (alternative ? ` Використовуйте ${alternative} замість нього.` : '');
        
        return function (this: T, ...args: A): R {
            console.warn(message);
            return originalMethod.apply(this, args);
        };
  }
}


// Task 2

function DeprecatedMinLength(minValue: number) {
  return function<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, origianlValue: number): number {
      if(origianlValue < minValue) throw Error('Min');

      return origianlValue;
    }
  
    return updatedProperty;
  }
}

function DeprecatedMaxLength(maxValue: number) {
  return function<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, origianlValue: number): number {
      if(origianlValue > maxValue) throw Error('Max');

      return origianlValue;
    }
  
    return updatedProperty;
  }
}

function DeprecatedEmail<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
  if (context.kind !== 'field') throw new Error('Field-only decorator');

  function updatedProperty(this: T, origianlValue: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(origianlValue)) throw new Error(`${origianlValue} має бути валідною email-адресою.`);

    return origianlValue;
  }

  return updatedProperty;
}

