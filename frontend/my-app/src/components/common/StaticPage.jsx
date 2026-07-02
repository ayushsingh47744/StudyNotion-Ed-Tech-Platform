import React from "react";

export default function StaticPage({ title, children }) {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-16 text-richblack-5">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>
      <div className="text-richblack-200 leading-7 space-y-4">{children}</div>
    </div>
  );
}