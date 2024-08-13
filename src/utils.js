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