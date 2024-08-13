import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bars3Icon, ShoppingBagIcon, CakeIcon } from "@heroicons/react/24/solid"
import FoodDetailModalContext from "../contexts/FoodDetailModalContext"
import FoodCartContext from "../contexts/FoodCartContext"
import AvatarProfile from "./AvatarProfile"
import OrderContext from "../contexts/OrderContext"
import { animateScroll as scroll } from 'react-scroll'
import AuthContext from "../contexts/AuthContext"

export default function Navbar() {
  const { open } = useContext(FoodDetailModalContext)
  const { foodCarts } = useContext(FoodCartContext)
  const { foodOrder } = useContext(OrderContext)
  const { isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()

  function onClickCreateButton() {
    open()
  }

  function onClickOrderButton() {
    if (location.pathname != '/') navigate('/')
    scroll.scrollToTop()
  }

  return (
    <div className="navbar fixed top-0 z-10 shadow-md bg-white">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Bars3Icon className="size-6 text-primary" />
        </button>
      </div>
      <div className="flex-1 mx-3">
        <HomeMenuButton />
        <CreateFoodButton isAdmin={isAdmin} onClick={onClickCreateButton} />
        <OrdersButton isAdmin={isAdmin} />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-5">
          {foodOrder ? <FoodOrderButton onclick={onClickOrderButton} /> : <FoodCartButton foodCarts={foodCarts} />}
          {/* <LinkMenuButton text={"About"} link={'/'} /> */}
          {/* <LinkMenuButton text={"Contact"} link={'/'} /> */}
          <AvatarProfile></AvatarProfile>
        </ul>
      </div>
    </div>
  )
}

function FoodOrderButton({ onclick }) {
  return (
    <button className="btn btn-success text-base text-white" onClick={onclick}>
      <CakeIcon className="size-5" />
      <span className="uppercase">Order</span>
    </button>
  )
}

function FoodCartButton({ foodCarts }) {
  return (
    <Link to={'/food_cart'}>
      <button className="btn btn-primary text-base">
        <ShoppingBagIcon className="size-5" />
        <span>Your Food</span>
        {foodCarts.length > 0 && (<span className="">: {foodCarts.length}</span>)}
      </button>
    </Link>
  )
}

function HomeMenuButton() {
  return (<Link to={'/'}><button className="text-2xl text-primary uppercase text-nowrap">Food Order</button></Link>)
}

function LinkMenuButton({ text, link }) {
  return (
    <Link to={link}><li><button className="btn btn-ghost text-base text-accent uppercase">{text}</button></li></Link>
  )
}

function CreateFoodButton({ isAdmin, onClick }) {
  return isAdmin && (<button onClick={onClick} className="btn btn-ghost font-semibold text-primary uppercase mx-3">New Food</button>)
}

function OrdersButton({ isAdmin }) {
  return isAdmin && (<Link to={'/orders'}><button className="btn btn-ghost font-semibold text-primary uppercase">Orders</button></Link>)
}
