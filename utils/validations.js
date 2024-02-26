
let required = (propertyType, customErrorMessage) => {
  return v => v && v.length > 0 || customErrorMessage || `Вы должны указать ${propertyType}`
}

let minLength = (propertyType, minLength) => {
  return v => {
    if(!v){ return true; }

    return v.length >= minLength || `${propertyType} должен быть не менее ${minLength} символов`;
  }
}

let maxLength = (propertyType, maxLength) => {
  return v => v && v.length <= maxLength || `${propertyType} должен быть более ${maxLength} символов`
}

let emailFormat = () => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return v => v && regex.test(v) || "Введите корректный email"
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat
}
