import _ from 'lodash'

export const unusedFoodFields = [
  'id',
  'food_id',
  'food_image_url',
  'category_id',
  'created_at',
  'updated_at',
]

export function getFilterFormData(data, filterField) {
  return _.omit(data, filterField)
}

export function getCombineFormData(data) {
  const formData = new FormData()
  Object.keys(data).forEach(key => { formData.append(key, data[key]) })
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