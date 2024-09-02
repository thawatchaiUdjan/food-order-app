import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bars3Icon, ShoppingBagIcon, CakeIcon, XMarkIcon, WalletIcon } from "@heroicons/react/24/solid"
import FoodDetailModalContext from "../contexts/FoodDetailModalContext"
import FoodCartContext from "../contexts/FoodCartContext"
import AvatarProfile from "./AvatarProfile"
import OrderContext from "../contexts/OrderContext"
import { animateScroll as scroll } from 'react-scroll'
import AuthContext from "../contexts/AuthContext"
import { getFormatBalance } from "../../utils"

export default function Navbar() {
  const { open } = useContext(FoodDetailModalContext)
  const { foodCarts } = useContext(FoodCartContext)
  const { foodOrder } = useContext(OrderContext)
  const { user, isAdmin } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function onClickCreateButton() {
    open()
  }

  function onClickOrderButton() {
    if (location.pathname != '/') navigate('/')
    scroll.scrollToTop()
  }

  function onClickToggleMenuButton() {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div className={`navbar fixed top-0 z-10 ${menuOpen ? 'border-b' : 'shadow-md'} bg-white`}>
        <div className="flex-none">
          <label className="btn btn-square btn-ghost md:hidden swap swap-rotate">
            <input type="checkbox" />
            <Bars3Icon className="size-6 text-primary swap-off" onClick={onClickToggleMenuButton} />
            <XMarkIcon className="size-6 text-primary swap-on" onClick={onClickToggleMenuButton} />
          </label>
        </div>

        {/* left menu */}
        <div className="flex-1 mx-3 sm:pl-7">
          <HomeMenuButton />
          {/* hide menu collapse */}
          <div className="hidden md:flex ml-2">
            {isAdmin && <MenuButton text={'New Food'} onClick={onClickCreateButton} />}
            {isAdmin && <MenuLink text={'Orders'} link={'/orders'} />}
          </div>
        </div>

        {/* right menu */}
        <div className="flex-none pr-4 sm:pr-8">
          <ul className="menu menu-horizontal px-1 gap-5">
            <div className="hidden md:flex">
              <WalletButton balance={user.user.balance} />
              {/* <LinkMenuButton text={"About"} link={'/'} /> */}
              {/* <LinkMenuButton text={"Contact"} link={'/'} /> */}
            </div>
            <AvatarProfile />
          </ul>
        </div>
      </div>

      {/* floating icons */}
      {foodOrder ? <FoodOrderFloatingIcon onClick={onClickOrderButton} /> : <FoodCartFloatingIcon foodCarts={foodCarts} />}

      {/* collapse menu */}
      {(
        <div className={`collapse-menu fixed top-20 left-0 w-full bg-white md:hidden z-[9] ${menuOpen ? 'open shadow-lg' : 'closed'}`}
        >
          <ul className="flex flex-col w-full">
            {isAdmin && <CollapseMenuButton text={'New Food'} onClick={onClickCreateButton} />}
            {isAdmin && <CollapseMenuLink text={'Orders'} link={'/orders'} />}
          </ul>
        </div>
      )}
    </>
  )
}

function FoodOrderFloatingIcon({ onClick }) {
  return (
    <button className="fixed bottom-5 right-5 shadow-lg transition-colors btn btn-success btn-circle text-white z-[9]" onClick={onClick}>
      <CakeIcon className="size-6" />
    </button>
  )
}

function FoodCartFloatingIcon({ foodCarts }) {
  return (
    <Link to={'/food_cart'}>
      <button className="fixed bottom-5 right-5 shadow-lg transition-colors btn btn-primary btn-circle z-[9]">
        <ShoppingBagIcon className="size-6" />
        <div className="absolute top-[-5px] right-[-5px] shadow-xl">
          {foodCarts.length > 0 && (<div className="rounded-full size-6 bg-primary flex items-center justify-center">{foodCarts.length}</div>)}
        </div>
      </button>
    </Link>
  )
}

function WalletButton({ balance }) {
  return (
    <Link to={'/profile'}>
      <button className="btn btn-success text-white text-base items-center">
        <WalletIcon className="size-5" />
        <span className="text-lg">${getFormatBalance(balance)}</span>
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

function MenuButton({ text, onClick }) {
  return (
    <div onClick={onClick}
      className="btn btn-ghost text-lg font-normal text-primary uppercase">
      {text}
    </div>
  )
}

function MenuLink({ text, link }) {
  return (
    <Link to={link}>
      <button className="btn btn-ghost text-lg font-normal text-primary uppercase">
        {text}
      </button>
    </Link>
  )
}

function CollapseMenuButton({ text, onClick }) {
  return (
    <>
      <hr />
      <li
        className="btn btn-ghost text-primary text-md uppercase justify-start font-semibold rounded-none"
        onClick={onClick}>
        {text}
      </li>
    </>
  )
}

function CollapseMenuLink({ text, link }) {
  return (
    <>
      <hr />
      <Link to={link}
        className="btn btn-ghost text-primary text-md uppercase justify-start font-semibold rounded-none">
        {text}
      </Link>
    </>
  )
}
