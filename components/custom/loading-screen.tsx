import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#212121] min-h-[100vh]">
      <div className="flex flex-col items-center">
        {/* <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-white"></div> */}
        <p className="text-2xl font-bold text-muted-foreground">x0-GPT is syncing...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
