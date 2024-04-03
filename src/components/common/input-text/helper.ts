import * as R from "ramda"

const typeTextInput = {
  text: "text",
  password: "password",
  money: "money",
  money15: "money15",
  money5: "money5",
  moneyMillion: "moneyMillion",
  date: "date",
  decimal: "decimal",
  remove_utf8: "remove-utf8",
  trimMiddleText: "trimMiddleText",
  integer: "integer",
}

const replaceMoneyMillion = (m: any) => {
  if (m?.endsWith(".") || m?.endsWith(".0")) {
    return m?.split(".")[0]
  }
  if (m?.endsWith(",0")) {
    return m?.split(",")[0]
  }
  return m
}

const convertMoneyToNumber = (value: string) => {
  if (!value || value.length === 0) {
    return value
  }
  return R.compose(R.join(""), R.split("."))(value)
}

const convertMMToNumber = (value: string) => {
  if (!value || value.length === 0) {
    return value
  }
  let arr = value.split(",")
  if (arr.length == 1) {
    if (arr[0].length <= 6) {
      return R.compose(R.join(""), R.split("."))(arr[0])
    } else {
      let val = arr[0]
      return R.compose(R.join(""), R.split("."))(val)
    }
  } else {
    if (arr[0].length <= 6) {
      let integer = R.compose(R.join(""), R.split("."))(arr[0])
      let decimal =
        arr[1]?.length > 1
          ? arr[1]?.substring(0, 1)
          : R.compose(R.join(""), R.split("."))(arr[1])
      return `${integer}.${decimal}`
    } else {
      let val = arr[0]
      let integer = R.compose(R.join(""), R.split("."))(val)
      let decimal =
        arr[1]?.length > 1
          ? arr[1]?.substring(0, 1)
          : R.compose(R.join(""), R.split("."))(arr[1])
      return `${integer}.${decimal}`
    }
  }
}

const convertNumberToMM = (value: any) => {
  try {
    if (!value || value.length === 0) {
      return 0
    }
    let arr = `${value}`?.split(".")
    if (arr.length != 1) {
      let roundNumber = Math.round(Number(arr[0]))
      let integer = R.compose<any, any, any, any, any>(
        R.reverse,
        R.join("."),
        R.splitEvery(3),
        R.reverse
      )(String(roundNumber))
      return `${String(integer)},${arr[1]}`
    } else {
      let roundNumber = Math.round(Number(arr[0]))
      let money = R.compose<any, any, any, any, any>(
        R.reverse,
        R.join("."),
        R.splitEvery(3),
        R.reverse
      )(String(roundNumber))
      return String(money)
    }
  } catch (error) {
    return 0
  }
}

const convertNumberToMoney = (value: any, isFormCustomer = false) => {
  try {
    if (!value || value.length === 0) {
      return 0
    }
    const roundNumber = Math.round(Number(value))
    if (roundNumber < 0) {
      let data = roundNumber * -1
      const money = R.compose<any, any, any, any, any>(
        R.reverse,
        R.join("."),
        R.splitEvery(3),
        R.reverse
      )(String(data))
      if (value < 0) {
        return `-${money}`
      }
      return money
    } else {
      const money = R.compose<any, any, any, any, any>(
        R.reverse,
        R.join("."),
        R.splitEvery(3),
        R.reverse
      )(String(roundNumber))
      if (value < 0 && !isFormCustomer && value?.includes("-")) {
        return `-${money}`
      }
      return money
    }
  } catch (error) {
    return 0
  }
}

export {
  typeTextInput,
  replaceMoneyMillion,
  convertMoneyToNumber,
  convertMMToNumber,
  convertNumberToMM,
  convertNumberToMoney,
}
