import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  return (
    <>
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      ) : (
        <article className="w-full min-h-screen px-2 pt-24 pb-10 lg:pl-[320px] bg-gradient-to-br from-[#faf8f8] via-[#f3e9de] to-[#f5ecd2]">
          <section className="my-8">
            <h1 className="text-[#D6482b] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-center drop-shadow-lg bg-white/60 rounded-lg py-2">
              Auctions
            </h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
