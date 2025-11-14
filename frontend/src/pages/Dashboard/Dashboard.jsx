import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);
  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen px-5 pt-24 pb-12 lg:pl-[320px] flex flex-col gap-10 bg-gradient-to-br from-[#f6f4f0] via-[#fff4e6] to-[#f7fafc]">
          <h1 className="text-5xl font-extrabold mb-8 text-[#D6482b] drop-shadow-[0_4px_10px_rgba(214,72,43,0.1)]">Dashboard</h1>
          <div className="flex flex-col gap-10">
            <div className="bg-white/70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#d6482b] mb-2">Monthly Total Payments Received</h3>
              <PaymentGraph />
            </div>
            <div className="bg-white/70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#d6482b] mb-2">Users</h3>
              <BiddersAuctioneersGraph />
            </div>
            <div className="bg-white/70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#d6482b] mb-2">Payment Proofs</h3>
              <PaymentProofs />
            </div>
            <div className="bg-white/70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#d6482b] mb-2">Delete Items From Auction</h3>
              <AuctionItemDelete />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
