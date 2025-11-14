import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full min-h-screen py-12 px-2 flex flex-col items-center justify-start bg-gradient-to-br from-[#f7fafc] via-[#fff4e6] to-[#f5ecd2] lg:pl-[240px]">
        <div className="max-w-3xl w-full text-center mt-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#D6482b] drop-shadow-lg mb-4 animate-fade-in">PrimeBid</h1>
          <p className="text-xl md:text-2xl text-[#4e3629] mb-8 animate-fade-in delay-75">Where every bid is transparent, and every winner is celebrated.</p>
          <div className="mb-8 flex justify-center gap-6">
            {!isAuthenticated && (
              <>
                <Link to="/sign-up" className="bg-[#d6482b] shadow-md font-bold rounded-full px-8 py-3 text-white text-xl hover:bg-[#b8381e] transition-all duration-200">Sign Up</Link>
                <Link to="/login" className="bg-white/40 border border-[#d6482b] font-bold rounded-full px-8 py-3 text-[#d6482b] text-xl hover:bg-[#d6482b] hover:text-white transition-all duration-200">Login</Link>
              </>
            )}
          </div>
        </div>
        <div className="w-full max-w-6xl mt-4 pb-10">
          <h3 className="text-3xl font-bold text-[#d6482b] mb-4 text-center">How it works</h3>
          <div className="flex flex-wrap gap-6 items-stretch justify-center">
            {howItWorks.map((element) => (
              <div key={element.title} className="bg-white/80 rounded-2xl shadow-xl px-8 py-6 w-60 hover:scale-105 hover:shadow-2xl transition-all duration-200 flex flex-col justify-center items-center">
                <h5 className="font-semibold text-xl mb-2">{element.title}</h5>
                <p className="text-gray-600">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-7xl">
          <FeaturedAuctions />
          <UpcomingAuctions />
          <Leaderboard />
        </div>
      </section>
    </>
  );
};

export default Home;
