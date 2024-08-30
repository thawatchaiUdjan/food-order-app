import _ from 'lodash'

export const unusedFoodFields = [
  'id',
  'food_id',
  'food_image_url',
  'created_at',
  'updated_at',
]

export function getFilterFormData(data, filterField) {
  return _.omit(data, filterField)
}

export function getCombineFormData(data) {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach(item => formData.append(key, item))
    } else {
      formData.append(key, data[key])
    }
  })
  return formData
}

export function resetRefInputValue(ref) {
  ref.current.value = ''
}

export function logFormData(formData) {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }
}

export async function waitForSecond(sec = 500) {
  await new Promise(resolve => setTimeout(resolve, sec))
}

export function getFormattedDateTime(date) {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  const dateObject = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat('en-GB', options).format(dateObject)
}

export function getTransformField(data, targetField, field) {
  return data[targetField].length > 0 ? data[targetField].map(option => option[field]) : data[targetField]
}

export function getFormatBalance(value) {
  const numericNumber = value.toString().replace(/[^0-9.]/g, '')
  const floatNumber = parseFloat(numericNumber).toFixed(2) 
  return numericNumber ? new Intl.NumberFormat().format(floatNumber) : ''
}