// Task 1

export function DeprecatedMethod(reason: string, alternative: string) {
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

export function DeprecatedMinLength(minValue: number) {
  return function<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    let origianlValue: number;

    Object.defineProperty(context, 'value', {
      get() {
        return origianlValue;
      },
      set(newValue: number) {
        if (newValue < minValue) throw new Error('Min');
        origianlValue = newValue;
      },
      enumerable: true,
      configurable: true
    });

    return originalProperty;
  }
}

export function DeprecatedMaxLength(maxValue: number) {
  return function<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    let origianlValue: number;

    Object.defineProperty(context, 'value', {
      get() {
        return origianlValue;
      },
      set(newValue: number) {
        if (newValue > maxValue) throw new Error('Max');
        origianlValue = newValue;
      },
      enumerable: true,
      configurable: true
    });
  
    return originalProperty;
  }
}

export function DeprecatedEmail<T>(originalProperty: undefined, context: ClassFieldDecoratorContext<T>) {
  if (context.kind !== 'field') throw new Error('Field-only decorator');

  let value: string;

  Object.defineProperty(context, 'value', {
    get() {
      return value;
    },
    set(newValue: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) throw new Error(`${newValue} має бути валідною email-адресою.`);
      value = newValue;
    },
    enumerable: true,
    configurable: true
  });

  return originalProperty;
}

