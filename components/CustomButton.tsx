"use client";
import { CustomButtonProps } from "@/types";
import Image from "next/image";
import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({ title, containerStyles, handleClick,buttonType,textStyles,rightIcon,isDisabled }) => {
  return (
    <button
      className={`custom-btn ${containerStyles}`}
      type={buttonType || "button"}
      disabled={isDisabled || false}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && <div className="relative w-6 h-6">
        <Image src={rightIcon} alt="right icon" fill className="object-contain"/></div>}
    </button>
  );
};

export default CustomButton;
