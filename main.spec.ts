import { describe, expect, test, jest, beforeEach } from '@jest/globals';

import { DeprecatedMethod, DeprecatedMinLength, DeprecatedMaxLength, DeprecatedEmail } from './main';

describe('Decorators', () => {
  test('DeprecatedMethod should warn when method is called', () => {
    class TestClass {
      @DeprecatedMethod('Use another method', 'newMethod')
      oldMethod() {
        return 'old';
      }
    }

    const instance = new TestClass();
    console.warn = jest.fn();
    instance.oldMethod();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Метод oldMethod є застарілим.')); 
  });

  test('DeprecatedMinLength should prevent setting value below min', () => {
    class TestClass {
      @DeprecatedMinLength(10)
      value!: number;
    }
    
    const instance = new TestClass();
    expect(() => (instance.value = 5)).toThrow('Min');
  });

  test('DeprecatedMaxLength should prevent setting value above max', () => {
    class TestClass {
      @DeprecatedMaxLength(100)
      value!: number;
    }
    
    const instance = new TestClass();
    expect(() => (instance.value = 150)).toThrow('Max');
  });

  test('DeprecatedEmail should validate email format', () => {
    class TestClass {
      @DeprecatedEmail
      email!: string;
    }
    
    const instance = new TestClass();
    expect(() => (instance.email = 'invalid-email')).toThrow('invalid-email має бути валідною email-адресою.');
    expect(() => (instance.email = 'test@example.com')).not.toThrow();
  });
});
