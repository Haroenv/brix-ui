import { InputHTMLAttributes } from 'react';

interface InputMeta {
  isRequired?: boolean;
  isDisabled?: boolean;
}

export interface Input<Value>
  extends InputMeta,
    Omit<Partial<InputHTMLAttributes<HTMLInputElement>>, 'value' | 'onChange' | 'type' | 'defaultValue' | 'prefix'> { // prefix does not exist on this type but typescript thought otherwise
  value?: Value;
  defaultValue?: Value;
  onChange?: (value: Value) => void;
}
