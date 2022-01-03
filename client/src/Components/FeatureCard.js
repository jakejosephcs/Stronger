import React from "react";
import { ICON_NAME } from "../Utils";

function FeatureCard({ iconName, featureText, isComingSoon }) {
  const IconComponentName = ICON_NAME[iconName];
  return (
    <div
      className={`flex bg-slate-200 py-4 px-3 rounded mb-4 ${
        isComingSoon && "relative"
      }`}
    >
      {isComingSoon && (
        <span className="absolute top-0 right-0 text-xs bg-blue-300 text-white rounded-bl-full px-2">
          coming soon
        </span>
      )}
      <IconComponentName />
      <p className="ml-4">{featureText}</p>
    </div>
  );
}

export default FeatureCard;
