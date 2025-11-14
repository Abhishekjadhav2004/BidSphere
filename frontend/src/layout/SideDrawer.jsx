import React, { useState } from "react";
import { RiAuctionFill, RiFacebookFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useLocation } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const location = useLocation();

  const navLinks = [
    {to: '/auctions', label: 'Auctions', icon: <RiAuctionFill />},
    {to: '/leaderboard', label: 'Leaderboard', icon: <MdLeaderboard />},
    {to: '/submit-commission', label: 'Submit Commission', icon: <FaFileInvoiceDollar />, role: 'Auctioneer'},
    {to: '/create-auction', label: 'Create Auction', icon: <IoIosCreate />, role: 'Auctioneer'},
    {to: '/view-my-auctions', label: 'View My Auctions', icon: <FaEye />, role: 'Auctioneer'},
    {to: '/dashboard', label: 'Dashboard', icon: <MdDashboard />, role: 'Super Admin'}
  ];

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#D6482B] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-full sm:w-[315px] bg-white/80 backdrop-blur-md shadow-xl h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"} transition-all duration-300 p-6 flex flex-col justify-between lg:left-0 border-r border-[#ffcdb2] z-40`}
      >
        <div className="relative">
          <Link to={'/'} className="flex gap-2 items-center mb-8">
            <span className="text-[2.3rem]">🎯</span>
            <h4 className="text-4xl font-black tracking-tight text-[#D6482b] drop-shadow-md">PrimeBid</h4>
          </Link>
          <ul className="flex flex-col gap-1 mb-8">
            {navLinks.map(l => {
              if (l.role && (!isAuthenticated || !user || user.role !== l.role)) return null;
              const active = location.pathname.startsWith(l.to);
              return (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className={`flex gap-2 items-center text-xl font-bold py-2 px-4 rounded-lg transition-all duration-200 whitespace-nowrap ${active ? 'bg-[#D6482b]/10 border-l-4 border-[#D6482b] text-[#d6482b] shadow-lg' : 'text-stone-900 hover:bg-[#d6482b]/10 hover:text-[#d6482b]'}`}
                  >
                    <span className="text-2xl">{l.icon}</span> {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <hr className="mb-6 border-[#ffcdb2]"/>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to={'/me'} className={`flex items-center gap-2 text-lg font-semibold px-3 py-1.5 hover:text-[#D6482b] ${location.pathname==='/me' ? 'text-[#d6482b]' : 'text-zinc-700'}`}><FaUserCircle className="text-xl"/> Profile</Link>
            </li>
            <li>
              <Link to={'/how-it-works-info'} className="flex items-center gap-2 text-lg font-semibold px-3 py-1.5 text-zinc-700 hover:text-[#D6482b]">
                <SiGooglesearchconsole className="text-xl"/> How it works
              </Link>
            </li>
            <li>
              <Link to={'/about'} className="flex items-center gap-2 text-lg font-semibold px-3 py-1.5 text-zinc-700 hover:text-[#D6482b]">
                <BsFillInfoSquareFill className="text-lg"/> About Us
              </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[32px] sm:hidden hover:scale-110 transition-transform duration-200 cursor-pointer z-10"
          />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {!isAuthenticated ? (
            <div className="flex gap-4">  
              <Link to={'/sign-up'}
                className="bg-gradient-to-br from-[#FD9064] to-[#D6482b] font-bold rounded-full px-7 py-2 text-white shadow-lg hover:scale-105 focus:ring-4 focus:ring-[#fdb188]/40 transition-all duration-200 text-lg">
                Sign Up
              </Link>
              <Link to={'/login'} 
                className="bg-white border border-[#D6482b] text-[#d6482b] rounded-full px-7 py-2 font-bold shadow-md hover:bg-[#d6482b]/20 focus:ring-4 focus:ring-[#fdb188]/40 transition-all duration-200 text-lg">
                Login
              </Link>
            </div>
          ) : (
            <div><button 
              className="bg-gradient-to-br from-[#FD9064] to-[#D6482b] font-bold w-full rounded-full px-7 py-2 text-white shadow-lg hover:scale-105 focus:ring-4 focus:ring-[#fdb188]/40 transition-all duration-200 text-lg"
              onClick={handleLogout}>Logout</button></div>
          )}
        </div>
        <div className="mt-10 mb-2 flex flex-col items-start gap-2 opacity-85 text-[14px] select-none">
          <div className="flex gap-3 mb-1">
            <a href="#" className="bg-white/70 text-[#4267B2] rounded-full p-2 hover:bg-[#f4f6fb] shadow-sm"><FaFacebook /></a>
            <a href="#" className="bg-white/70 text-[#C13584] rounded-full p-2 hover:bg-[#fbeaf7] shadow-sm"><RiInstagramFill /></a>
          </div>
          <span className="text-zinc-500">Contact Us</span>
          <span className="text-zinc-400 font-bold">PRIME BID</span>
          <span className="text-zinc-300">Powered by <a href="#" className="hover:underline text-[#D6482b]">Abhi Jadhav</a></span>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;

