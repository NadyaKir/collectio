import React from "react";

export default function AuthImage() {
  return (
    <div
      className="hidden lg:flex w-full lg:w-1/2 
        justify-around items-center"
    >
      <div
        className=" 
                bg-black 
                opacity-20 
                inset-0 
                z-0"
      ></div>
      <div className="bg-login-img bg-cover bg-center h-screen w-full px-20 flex-col relative">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="flex flex-col justify-center h-screen relative z-10">
          <h1 className="text-white font-bold text-4xl font-sans">
            Discover, Collect, Share: <br /> Your Collections, Your Story.
          </h1>
          <p className="text-white mt-8">
            Empowering collectors to connect, curate, and cherish memories.
            <br />
            Dive into our app to explore, organize, and share your passions with
            a community of like-minded enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
}
