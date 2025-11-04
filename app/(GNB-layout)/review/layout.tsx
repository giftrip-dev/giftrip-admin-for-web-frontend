"use client";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-10">
      <div>{children}</div>
    </div>
  );
};

export default ReviewLayout;
