import React from "react";

import GeneralAvatar from "./GeneralAvatar";
import EditableField from "../../patient/_components/EditableField";
import { useEditSettings } from "@/store/useEditSettings";

export default function AccountSettings() {
  const errors = {};
  const register = () => {};

  const { isEditing } = useEditSettings();

  return (
    <div className="mt-2">
      <h1 className="settingsHeader">Account Settings</h1>
      <form className="w-full">
        <div className="inputSection">
          <EditableField
            label="First Name"
            name="firstName"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Last Name"
            name="lastName"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="Phone"
            name="phone"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Email"
            name="email"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="line"></div>
        <h1 className="text-lg font-bold mb-2 text-[var(--btn-primary)] ">
          Address
        </h1>
        <div className="inputSection">
          <EditableField
            label="Country"
            name="country"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="City"
            name="city"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="Address"
            name="address"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Postal Code"
            name="postalCode"
            inputData={"None"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
      </form>
    </div>
  );
}
