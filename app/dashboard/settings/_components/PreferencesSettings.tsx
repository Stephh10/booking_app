import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

export default function PreferencesSettings() {
  return (
    <div>
      <h1 className="settingsHeader">Select Theme</h1>
      <div className="flex gap-4">
        <div className="settingsModeCard activeModeCard">
          <div className="relative flex-1 w-[250px]">
            <Image src="/mode-light.png" alt="mode-light" fill />
          </div>
          <div className="flex justify-between items-center w-full h-[45px] bg-[var(--bg)] p-2">
            <p className="text-md font-bold">Light Mode (Active)</p>
            <CircleCheck size={20} />
          </div>
        </div>
        <div className="settingsModeCard">
          <div className="relative flex-1 w-[250px]">
            <Image src="/mode-dark.png" alt="mode-dark" fill />
          </div>
          <div className="flex justify-between items-center w-full h-[45px] bg-[var(--bg)] p-2">
            <p className="text-md font-bold">Dark Mode</p>
            <CircleCheck size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
