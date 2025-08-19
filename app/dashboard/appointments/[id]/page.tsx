import React from "react";
import UserInfo from "@/components/UserInfo";
import { Ellipsis } from "lucide-react";

export default function page() {
  return (
    <div>
      <UserInfo>
        <button>
          <Ellipsis size={22} />
        </button>
      </UserInfo>
    </div>
  );
}
