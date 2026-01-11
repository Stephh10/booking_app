"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import ThemeCard from "./ThemeCard";
import { useThemeState } from "@/store/useTheme";
import { changeTimeZone } from "@/app/actions/user";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { useState } from "react";

export default function PreferencesSettings({ userData }: { userData: User }) {
  const { toggleTheme } = useTheme();
  const { theme } = useThemeState();

  const [isPending, startTransition] = useTransition();
  const [timeZone, setTimeZone] = useState<string | undefined>(
    userData.timeZone ?? undefined
  );

  function handleTimeZoneChange(value: string) {
    startTransition(async () => {
      setTimeZone(value);
      const response = await changeTimeZone(value);

      if ("error" in response) {
        toast.error(response.error);
        return;
      } else {
        toast.success(response.success);
        return;
      }
    });
  }

  return (
    <div>
      <h1 className="settingsHeader mt-2">Select Theme</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <ThemeCard
          cardThemeValue="light"
          theme={theme}
          toggleTheme={() => toggleTheme("light")}
        />
        <ThemeCard
          cardThemeValue="dark"
          theme={theme}
          toggleTheme={() => toggleTheme("dark")}
        />
      </div>
      <div className="preferencesDetails mt-4  w-full lg:w-[38%]">
        <h1 className="settingsHeader">Preferences Details</h1>
        <div className="flex justify-between items-center mb-4">
          <h2>Time Zone</h2>
          <Select onValueChange={handleTimeZoneChange} value={timeZone}>
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
