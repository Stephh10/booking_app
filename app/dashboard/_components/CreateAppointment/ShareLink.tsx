"use client";

import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareLink({ activeUser }: any) {
  // const link = `${window.location.origin}/schedule/${activeUser.user.id}`;

  function copyLink() {
    // navigator.clipboard
    //   .writeText(link)
    //   .then(() => {
    //     toast.success("Link copied to clipboard");
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to copy link");
    //     console.error(err);
    //   });
  }
  return (
    <button
      onClick={copyLink}
      className="outlineBtn flex items-center justify-center gap-1"
    >
      <LinkIcon size={17} />
      Schedule link
    </button>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import { Link as LinkIcon } from "lucide-react";

// export default function ShareLink({ activeUser }: any) {
//   return (
//     <button
//       className="outlineBtn flex items-center justify-center gap-1"
//       href={`/schedule/${activeUser.user.id}`}
//     >
//       <LinkIcon size={17} />
//       Schedule link
//     </Link>
//   );
// }
