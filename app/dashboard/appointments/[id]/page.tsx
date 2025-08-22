import React from "react";
import UserInfo from "@/components/UserInfo";
import { Ellipsis } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppDetails from "../_components/AppDetails";
import AppHistory from "../_components/AppHistory";
import AppNotes from "../_components/AppNotes";
import AppAttachments from "../_components/AppAttachments";

export default function page() {
  return (
    <div>
      <UserInfo>
        <button>
          <Ellipsis size={22} />
        </button>
      </UserInfo>
      <div className="p-4 bg-[var(--secondary)] rounded-2xl">
        <Tabs defaultValue="details" className="w-[400px]">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="details">
              Appointment Details
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="history">
              Patient History
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="notes">
              Notes
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="attachments">
              Attachments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AppDetails />
          </TabsContent>
          <TabsContent value="history">
            <AppHistory />
          </TabsContent>
          <TabsContent value="notes">
            <AppNotes />
          </TabsContent>
          <TabsContent value="attachments">
            <AppAttachments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
