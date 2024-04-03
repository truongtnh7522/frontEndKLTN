import React, { FC, useEffect, useRef, useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form";
import {
  convertMMToNumber,
  convertMoneyToNumber,
  convertNumberToMM,
  convertNumberToMoney,
  replaceMoneyMillion,
  typeTextInput,
} from "./helper";

interface InputTextProps {
  control?: any;
  name?: string;
  inputType?: string;
  placeholder?: any;
  label?: any;
  defaultValue?: any;
  rules?: any;
  disabled?: boolean;
  errorMessage?: any;
  inputProps?: any;
  onBlurInput?: (value: any) => void;
  required?: boolean;
  leftText?: any;
  rightText?: any;
  trimMiddleText?: boolean;
  autoCapitalize?: any;
  regex?: any;
}

const typeMoney: any = { money: 15, money15: 15, money5: 5, moneyMillion: 15 };

const InputText: FC<InputTextProps> = ({
  control,
  name,
  inputType = typeTextInput.text,
  label,
  placeholder,
  defaultValue = "",
  rules,
  disabled,
  errorMessage,
  required,
  leftText,
  rightText,
  onBlurInput,
  trimMiddleText,
  autoCapitalize,
  regex,
}) => {
  const valueRef = useRef(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage && errorMessage !== "") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [errorMessage]);

  const isDecimalNumber = (str: any) =>
    /^\d{0,18}\.\d{0,1}$|^\d{0,20}$/.test(str);

  const onBlurHandle = (e: any, onChange: any, onBlur: any) => {
    let value: any = e.target.value;
    if (inputType === typeTextInput.moneyMillion) {
      value = replaceMoneyMillion(value);
    }

    if (inputType === typeTextInput.trimMiddleText || trimMiddleText) {
      value = value?.replace(/\s+/g, " ");
      value = value.trim();
      if (onChange) {
        onChange(value);
      }
    }
    if (autoCapitalize && autoCapitalize === "characters") {
      value = value?.toLocaleUpperCase();
      if (onChange) {
        onChange(value);
      }
    }

    if (onBlur) {
      if (typeMoney.hasOwnProperty(inputType)) {
        onBlur(convertMoneyToNumber(value));
        onBlurInput && onBlurInput(convertMoneyToNumber(value));
      } else {
        onBlur(value);
        onBlurInput && onBlurInput(value);
      }
    }
  };

  const onChangeHandle = (e: any, onChange: any) => {
    let value: any = e.target.value;
    if (typeMoney.hasOwnProperty(inputType)) {
      if (inputType == typeTextInput.moneyMillion) {
        if (!value) {
          return onChange("");
        }
        if (regex && !regex.test(convertMMToNumber(value))) {
          throw new Error("value not matches regex");
        }
        const numberOfMoney = convertMMToNumber(value);
        if (!/^[0-9.]*$/.test(numberOfMoney)) {
          return;
        }
        const len = numberOfMoney?.length;
        if (len > typeMoney[inputType]) {
          return;
        }
        return onChange(numberOfMoney);
      } else {
        if (regex && !regex.test(convertMoneyToNumber(value))) {
          throw new Error("value not matches regex");
        }
        const numberOfMoney = convertMoneyToNumber(value);
        if (!/^[0-9.]*$/.test(numberOfMoney)) {
          return;
        }
        const len = numberOfMoney?.length;
        if (len > typeMoney[inputType]) {
          return;
        }
        return onChange(numberOfMoney);
      }
    } else if (inputType === typeTextInput.decimal) {
      if (isDecimalNumber(value)) {
        onChange(value);
      }
    } else if (inputType === typeTextInput.integer) {
      onChange(value.replace(/[^0-9]/g, ""));
    } else {
      onChange(value);
    }
  };

  const convertTextValue = (input: any) => {
    try {
      if (typeMoney.hasOwnProperty(inputType)) {
        // if it's input money then can't paste the character
        if (!!input && input !== "null") {
          // return Utilities.convertNumberToMoney(convertMoneyDefault(input))
          if (inputType == typeTextInput.moneyMillion) {
            return replaceMoneyMillion(convertNumberToMM(input)) ?? "";
          } else {
            const value = convertMoneyDefault(input);
            return convertNumberToMoney(value);
          }
        }
        return "";
      } else {
        const inputText = !!input && input !== "null" ? input : "";
        const inputString =
          typeof inputText === "string"
            ? inputText?.trimStart()
            : inputText.toString();
        return inputString;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertMoneyDefault = (input: any) => {
    if (input == -1) {
      return null;
    }
    return input;
  };

  const renderComponent = (params: {
    field: ControllerRenderProps<any, any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  }) => {
    const { onChange, onBlur, value, name } = params?.field;
    if (value !== valueRef.current) {
      valueRef.current = value;
    }
    console.log(rightText);
    return (
      <div>
        <div>
          {/* <span className="text-[12]">
            {label} {required && <span className="text-red"> *</span>}
          </span> */}
        </div>
        <div>
          {!!leftText && <span>{leftText}</span>}
          <input
            {...params?.field}
            type={inputType}
            placeholder={placeholder || label}
            required={required}
            disabled={disabled}
            style={{ fontSize: 13, paddingTop: 30, paddingBottom: 30 }}
            onChange={(e: any) => onChangeHandle(e, onChange)}
            value={value ? convertTextValue(value) : ""}
            onBlur={(e: any) => {
              onBlurHandle(e, onChange, onBlur);
            }}
            className="input"
          />
          {!!rightText && <span>{rightText}</span>}
          {hasError == false && <div>{errorMessage}</div>}
        </div>
      </div>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={renderComponent}
      rules={rules}
    />
  );
};

export default InputText;
