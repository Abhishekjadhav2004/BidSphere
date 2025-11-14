import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaFileInvoiceDollar } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdDashboard, MdLeaderboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="w-full min-h-screen px-2 pt-24 pb-10 lg:pl-[320px] bg-gradient-to-br from-[#f7fafc] via-[#fff4e6] to-[#f5ecd2] flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-10 items-center">
          <div className="bg-white/90 shadow-xl rounded-2xl p-8 flex flex-col items-center -mt-10">
            <div className="mx-auto mb-8 relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#fdba88] to-[#d6482b] shadow-lg flex items-center justify-center">
                <img src={user.profileImage?.url} alt="profile pic" className="rounded-full w-32 h-32 border-4 border-white shadow-lg" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#d6482b] mb-8">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl text-center">
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><FaUserCircle/> Username</span>
                <div className="text-lg font-semibold">{user.userName}</div>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><MdDashboard/> Email</span>
                <div className="text-lg font-semibold">{user.email}</div>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><BsFillInfoSquareFill/> Phone</span>
                <div className="text-lg font-semibold">{user.phone}</div>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><SiGooglesearchconsole/> Address</span>
                <div className="text-lg font-semibold">{user.address}</div>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><FaFileInvoiceDollar/> Role</span>
                <div className="text-lg font-semibold">{user.role}</div>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1"><MdLeaderboard/> Joined On</span>
                <div className="text-lg font-semibold">{user.createdAt?.substring(0, 10)}</div>
              </div>
            </div>
          </div>
          {user.role === "Auctioneer" && (
            <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full flex flex-col items-center gap-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#d6482b] mb-2 flex items-center gap-2">Payment Details <span>💰</span></h2>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">🏦 Bank Name</label>
                  <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.paymentMethods.bankTransfer.bankName}</div>
                </div>
                <div>
                  <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">🔢 Bank Account (IBAN)</label>
                  <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.paymentMethods.bankTransfer.bankAccountNumber}</div>
                </div>
                <div>
                  <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">👤 User Name On Bank</label>
                  <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.paymentMethods.bankTransfer.bankAccountName}</div>
                </div>
                <div>
                  <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">💳 Paypal Email</label>
                  <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.paymentMethods.paypal.paypalEmail}</div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full flex flex-col items-center mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d6482b] mb-2">Other User Details</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-2 w-full">
              {user.role === "Auctioneer" && (
                <div className="flex-1">
                  <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">💵 Unpaid Commissions</label>
                  <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.unpaidCommission}</div>
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div className="flex-1">
                    <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">🏆 Auctions Won</label>
                    <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.auctionsWon}</div>
                  </div>
                  <div className="flex-1">
                    <label className="flex items-center gap-1 text-gray-700 font-semibold mb-1">💸 Money Spent</label>
                    <div className="bg-gray-100 shadow-inner rounded-lg px-4 py-2 text-lg">{user.moneySpent}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
