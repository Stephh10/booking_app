import React from "react";
import EditableField from "../../patient/_components/EditableField";
import { useEditSettings } from "@/store/useEditSettings";

export default function SecuritySettings() {
  const errors = {};
  const register = () => {};

  const isEditing = true;

  return (
    <div>
      <div className="inputSection">
        <EditableField
          label="Current Password"
          name="currentPassword"
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="New Password"
          name="newPassword"
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <EditableField
        label="Repeat New Password"
        name="repeatNewPassword"
        inputData={""}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <button className="primaryBtn mt-3">Change Password</button>
    </div>
  );
}
