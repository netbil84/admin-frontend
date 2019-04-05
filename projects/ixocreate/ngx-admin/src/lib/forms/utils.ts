import { Observable } from 'rxjs/observable';

export function isNullOrUndefined(value: any) {
  return value === undefined || value === null;
}

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function clone(value: any): any {
  if (!isObject(value) || value instanceof RegExp || value instanceof Observable) {
    return value;
  }

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return new Date(value.getTime());
  }

  if (Array.isArray(value)) {
    return value.slice(0).map((v) => clone(v));
  }

  value = Object.assign({}, value);
  Object.keys(value).forEach((k) => value[k] = clone(value[k]));

  return value;
}
