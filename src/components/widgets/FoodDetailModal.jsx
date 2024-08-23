import { unusedFoodFields, getFilterFormData, getCombineFormData, resetRefInputValue, getTransformField } from '../../utils'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TrashIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/solid'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import FoodContext from '../contexts/FoodContext'
import InputTextLabel from './InputTextLabel'
import InputWithTails from './InputWithTails'
import InputTextArea from './InputTextArea'
import InputImageFile from './InputImageFile'
import ButtonIconOutline from './ButtonIconOutline'
import FoodCategoryContext from '../contexts/FoodCategoryContext'
import FoodOptionContext from '../contexts/FoodOptionContext'
import InputSelect from './InputSelect'

export default function FoodDetailModal({ food, isShow, isNew, close }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { open } = useContext(ConfirmModalContext)
  const { deleteFood, updateFood, createFood } = useContext(FoodContext)
  const { category } = useContext(FoodCategoryContext)
  const { foodOptions } = useContext(FoodOptionContext)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [currFood, setCurrFood] = useState(food)
  const imageFileRef = useRef(null)

  useEffect(() => {
    let foodData = { ...food }
    foodData.food_options = getTransformField(food, 'food_options', '_id')
    reset(foodData)
    setCurrFood(foodData)
    resetImageFileInput()
  }, [food, reset])

  function onSubmit(data, e) {
    const buttonName = e.nativeEvent.submitter.name
    const filterData = getFilterFormData(data, unusedFoodFields)
    let formData = getCombineFormData(filterData)
    formData = addImageFileFormData(formData)
    handleOnClickButton(buttonName, formData)
  }

  function addImageFileFormData(formData) {
    if (imageFile) {
      formData.append('food_image_url', imageFile)
    }
    return formData
  }

  function handleOnClickButton(buttonName, formData) {
    switch (buttonName) {
      case 'update':
        onClickUpdateButton(formData)
        break
      case 'create':
        onClickCreateButton(formData)
        break
    }
  }

  async function onClickUpdateButton(food) {
    setIsLoading(true)
    await updateFood(currFood.food_id, food)
    setIsLoading(false)
    resetImageFileInput()
  }

  function onClickDeleteButton() {
    open({
      title: 'Confirm Delete',
      detail: 'Are you sure you want to delete this food?',
      onConfirm: async () => {
        await deleteFood(currFood.food_id)
        close()
      }
    })
  }

  function onClickCreateButton(food) {
    open({
      title: 'Confirm Create',
      detail: 'Are you sure you want to create this food?',
      onConfirm: async () => {
        setIsLoading(true)
        await createFood(food)
        setIsLoading(false)
      }
    })
  }

  function onChangeImageFile(e) {
    const imageFile = e.target.files[0]
    if (imageFile) {
      const image = URL.createObjectURL(imageFile)
      setCurrFood(prevFood => ({ ...prevFood, food_image_url: image }))
      setImageFile(imageFile)
    }
  }

  function resetImageFileInput() {
    setImageFile(null)
    resetRefInputValue(imageFileRef)
  }

  const editFoodButtonGroup =
    <div className="modal-action justify-between m-0">
      <ButtonIconOutline
        text={'Update'}
        name={'update'}
        type='submit'
        buttonType={'primary'}
        isLoading={isLoading}
        icon={<ArrowPathIcon className='size-5'></ArrowPathIcon>}>
      </ButtonIconOutline>

      <ButtonIconOutline
        text={'Delete'}
        buttonType={'error'}
        onClick={onClickDeleteButton}
        icon={<TrashIcon className='size-5'></TrashIcon>}>
      </ButtonIconOutline>
    </div>

  const newFoodButtonGroup =
    <div className="modal-action justify-center m-0">
      <ButtonIconOutline
        text={'New Food'}
        name={'create'}
        type='submit'
        buttonType={'primary'}
        isLoading={isLoading}
        icon={<PlusIcon className='size-5'></PlusIcon>}>
      </ButtonIconOutline>
    </div>

  return (
    <dialog id='food-detail-modal' className={`modal z-30 max-w-full ${isShow ? 'modal-open' : 'modal-closed'} `}>
      <div className="modal-box max-w-2xl">
        <button onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div className="text-primary font-medium text-3xl text-center uppercase my-3">Food Detail</div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

          {/* image input */}
          <InputImageFile
            image={currFood.food_image_url}
            ref={imageFileRef}
            onChange={onChangeImageFile}>
          </InputImageFile>

          {/* name input */}
          <InputTextLabel
            id={'food-name-input'}
            label={'Name'}
            placeholder={'e.g., Pizza, Salad'}
            register={register}
            rules={{ required: 'Name is required' }}
            name={'food_name'}
            error={errors.food_name}>
          </InputTextLabel>

          {/* price group input*/}
          <div className='flex flex-wrap gap-5'>
            <InputWithTails
              id={'food-price-input'}
              label={'Price'}
              placeholder={'0.00'}
              startTail={'$'}
              endTail={'USD'}
              type={'number'}
              name={'food_price'}
              register={register}
              error={errors.food_price}
              rules={{
                required: 'Price is required',
                validate: {
                  positive: value => value > 0 || 'Price must be greater than 0',
                },
              }}>
            </InputWithTails>
            <InputWithTails
              id={'food-discountPrice-input'}
              label={'Discount Price'}
              placeholder={'0.00'}
              startTail={'$'}
              endTail={'USD'}
              type={'number'}
              name={'food_price_discount'}
              register={register}
              error={errors.food_price_discount}
              rules={{
                required: 'Discount price is required',
                validate: {
                  positive: value => value > 0 || 'Discount price must be greater than 0',
                },
              }}>
            </InputWithTails>
          </div>

          {/* category select input */}
          <InputSelect
            data={category}
            valueField={'category_id'}
            textField={'category_name'}
            id={'food-category-select'}
            label={'Category'}
            defaultText={'Select a category'}
            register={register}
            rules={{ required: 'Category is required' }}
            name={'category_id'}
            error={errors.category_id}>
          </InputSelect>

          {/* food options checkbox input*/}
          <div>
            <label className='text-lg'>Food Options</label>
            {
              foodOptions.map((option, index) => (
                <label key={index} className='flex flex-row items-center gap-3 mt-2 cursor-pointer'>
                  <input
                    type="checkbox"
                    value={option._id}
                    className={`checkbox checkbox-primary ${errors.food_options ? 'border border-error' : ''}`}
                    {...register('food_options', { required: 'Food option is required' })} />
                  <div className='flex flex-col'>
                    <div className='flex flex-wrap items-baseline gap-1'>
                      <span className={`${errors.food_options ? 'text-error' : ''}`}>{option.option_name}</span>
                      <span className='text-sm text-gray-500'>({option.option_description.toLowerCase()})</span>
                    </div>
                    <div>
                      {
                        option.option_choices.map((choice, index) => (
                          <span key={index} className='text-sm text-gray-400 mr-1'>{choice.choice_name},</span>
                        ))
                      }
                    </div>
                  </div>
                </label>
              ))
            }
          </div>

          {/* description input */}
          <InputTextArea
            id={'food-decs-input'}
            label={'Description'}
            placeholder={'e.g., Spicy grilled chicken with herbs'}
            register={register}
            rules={{ required: 'Description is required' }}
            name={'food_description'}
            error={errors.food_description}>
          </InputTextArea>

          {/* button group */}
          {isNew ? newFoodButtonGroup : editFoodButtonGroup}

        </form>
      </div>
    </dialog>
  )
}
