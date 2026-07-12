import React from "react";

const SideListCard = () => {
  return (
    <div className="flex gap-6">
      <div className="w-[50%]">
        <div className="bg-slate-400 pt-[56%] rounded-md"></div>
      </div>
      <div>
        <h3>Video Title</h3>
        <p>Author Name</p>
        <div className="flex gap-1">
          <span>Video Views</span>
          <span>.</span>
          <span>Video Date</span>
        </div>
      </div>
      
    </div>
  );
};

export default SideListCard;
