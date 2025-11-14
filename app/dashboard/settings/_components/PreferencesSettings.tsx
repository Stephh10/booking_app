"use client";

import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreferencesSettings() {
  return (
    <div>
      <h1 className="settingsHeader mt-2">Select Theme</h1>
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
      <div className="preferencesDetails mt-4  w-full lg:w-[38%]">
        <h1 className="settingsHeader">Preferences Details</h1>
        <div className="flex justify-between items-center mb-4">
          <h2>Time Zone</h2>
          <Select>
            <SelectTrigger className="w-[60%]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">
                  Alaska Standard Time (AKST)
                </SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe & Africa</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="west">
                  Western European Summer Time (WEST)
                </SelectItem>
                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="cst_china">
                  China Standard Time (CST)
                </SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                <SelectItem value="ist_indonesia">
                  Indonesia Central Standard Time (WITA)
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Australia & Pacific</SelectLabel>
                <SelectItem value="awst">
                  Australian Western Standard Time (AWST)
                </SelectItem>
                <SelectItem value="acst">
                  Australian Central Standard Time (ACST)
                </SelectItem>
                <SelectItem value="aest">
                  Australian Eastern Standard Time (AEST)
                </SelectItem>
                <SelectItem value="nzst">
                  New Zealand Standard Time (NZST)
                </SelectItem>
                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>South America</SelectLabel>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2>Language</h2>
          <Select>
            <SelectTrigger className="w-[60%]">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem disabled value="es">
                  German
                  <span>(Comming soon)</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2>Sidebar Size</h2>
          <Select>
            <SelectTrigger className="w-[60%]">
              <SelectValue placeholder="Medium (240px)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="small">Small (200px)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem value="medium">Medium (240px)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectItem value="large">Large (280px)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
