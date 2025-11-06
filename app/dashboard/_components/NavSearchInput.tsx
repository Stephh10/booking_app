"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import NavSearchItem from "./NavSearchItem";
import { getPatientsByName } from "@/app/actions/patients";
import { useTransition } from "react";
import { Patient } from "@prisma/client";
import { Spinner } from "@/components/ui/spinner";

export default function NavSearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchData, setSearchData] = useState<Patient[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchValue) return;

    const handler = setTimeout(() => {
      startTransition(async () => {
        const response = await getPatientsByName(searchValue);

        if ("error" in response) return;

        setSearchData(response);
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  return (
    <div className="relative w-[55%] lg:w-[40%]">
      <div className="flex items-center gap-2 h-[40px] bg-[var(--bg)] rounded-lg px-4 shadow-lg ">
        <Search size={20} />
        <input
          className="h-full flex-1 outline-none"
          type="text"
          placeholder="Search Patients"
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={() => (setSearchValue(""), inputRef.current?.focus())}
          className="text-[var(--text-soft)] ml-auto cursor-pointer"
        >
          clear
        </button>
      </div>
      {searchValue && (
        <div className="searchResult absolute top-full left-0 mt-3 w-full rounded-lg p-1 bg-[var(--bg)] shadow-xl px-3">
          {searchData.length ? (
            searchData.map((patient) => (
              <NavSearchItem key={patient.id} itemData={patient} />
            ))
          ) : isPending ? (
            <div className="text-sm text-[var(--text-soft)]">
              <Spinner className="size-5 mx-auto text-[var(--text-soft)]" />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-[var(--text-soft)]  ">
                No Result Found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
