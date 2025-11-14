import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../custom-components/Card";
import Spinner from "../custom-components/Spinner";
import { FiTag, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const fieldError = (val) => !val ? "This field is required" : "";

  return (
    <section className="w-full min-h-screen flex flex-col-reverse lg:flex-row gap-8 items-center justify-center px-5 pt-20 bg-gradient-to-br from-[#fdf6f0] to-[#ffe2cf] transition-all">
      {/* Auction Form */}
      <motion.article
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 w-full max-w-[520px] rounded-lg shadow-xl py-8 px-6 bg-white/95 border border-[#fcdbb9]"
      >
        <h1 className="text-[#d6482b] flex gap-2 items-center text-3xl font-bold mb-2 lg:text-5xl">
          <FiTag className="inline-block text-[#fdba88] animate-bounce" />
          Create Auction
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleCreateAuction}>
          <div>
            <label className="flex gap-2 items-center text-[16px] text-stone-600 font-medium">
              <FiTag /> Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full ${fieldError(title) ? 'border-b-red-400' : ''}`}
              placeholder="e.g. Vintage Watch, Rare Comic ..."
            />
            <p className="text-xs text-stone-400 mt-1">Short, catchy titles get more attention.</p>
            {fieldError(title) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(title)}</span>)}
          </div>
          <div>
            <label className="text-[16px] text-stone-600 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full ${fieldError(category) ? 'border-b-red-400' : ''}`}
            >
              <option value="">Select Category</option>
              {auctionCategories.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
            {fieldError(category) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(category)}</span>)}
          </div>
          <div>
            <label className="text-[16px] text-stone-600 font-medium">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className={`text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full ${fieldError(condition) ? 'border-b-red-400' : ''}`}
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            {fieldError(condition) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(condition)}</span>)}
          </div>
          <div>
            <label className="text-[16px] text-stone-600 font-medium">Starting Bid</label>
            <input
              type="number"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              className={`text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full ${fieldError(startingBid) ? 'border-b-red-400' : ''}`}
              placeholder={"e.g. 1000"}
              min={0}
            />
            {fieldError(startingBid) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(startingBid)}</span>)}
          </div>
          <div>
            <label className="text-[16px] text-stone-600 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-2 border-stone-500 focus:outline-none w-full px-2 rounded-md"
              rows={6}
              placeholder="Describe your item, history, unique facts, etc."
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="text-[16px] text-stone-600 font-medium">Auction Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
                placeholderText="Pick start time"
              />
              {fieldError(startTime) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(startTime)}</span>)}
            </div>
            <div className="flex-1">
              <label className="text-[16px] text-stone-600 font-medium">Auction End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
                placeholderText="Pick end time"
              />
              {fieldError(endTime) && (<span className="flex gap-1 items-center text-xs text-red-400 mt-0.5"><FiAlertCircle/>{fieldError(endTime)}</span>)}
            </div>
          </div>
          <div>
            <label className="font-semibold text-lg md:text-xl">Auction Item Image</label>
            <div className="flex items-center justify-center w-full mt-2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-[#fff5eb] to-[#f5e1d3] hover:shadow-md hover:border-[#fdba88]"
                style={{ maxWidth: 400 }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imagePreview ? (
                    <img src={imagePreview} alt={title} className="w-44 h-auto rounded-lg shadow-lg" />
                  ) : (
                    <>
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                    </>
                  )}
                  <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG, GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={imageHandler} />
              </label>
            </div>
          </div>
          <button
            className="bg-[#D6482B] flex items-center justify-center gap-2 font-semibold hover:bg-[#b8381e] text-xl transition-all duration-300 py-2 px-4 rounded-md text-white w-[240px] mx-auto my-4 lg:w-[320px] shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Spinner size={22}/> : "Create Auction"}
          </button>
        </form>
      </motion.article>
      {/* Live Preview section */}
      <motion.section
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex flex-col items-center gap-6 w-full lg:max-w-md"
      >
        <h2 className="text-lg text-[#ce511f] font-bold mb-2">Live Auction Preview</h2>
        <Card
          imgSrc={imagePreview || "/public/auctionEnded.png"}
          title={title || "Your Auction Title"}
          startingBid={startingBid || 0}
          startTime={startTime || new Date()}
          endTime={endTime || new Date((new Date()).getTime() + 3600 * 1000)}
          id="preview"
        />
        <p className="italic text-stone-400 text-xs text-center">Your auction will look like this to bidders.</p>
      </motion.section>
    </section>
  );
};

export default CreateAuction;
