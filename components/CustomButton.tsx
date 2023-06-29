"use client";
import { CustomButtonProps } from "@/types";
import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({ title, containerStyles, handleClick,buttonType }) => {
  return (
    <button
      className={`custom-btn ${containerStyles}`}
      type={buttonType || "button"}
      disabled={false}
      onClick={handleClick}
    >
      <span className={`flex-1`}>{title}</span>
    </button>
  );
};

export default CustomButton;
