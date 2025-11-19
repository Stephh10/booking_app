import React from "react";
import EditableField from "../../patient/_components/EditableField";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { changePassword } from "@/app/actions/user";
import { toast } from "react-toastify";

export default function SecuritySettings() {
  const [editing, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const isEditing = true;

  function handlePasswordChange(data: any) {
    startTransition(async () => {
      const response = await changePassword(data);
      if ("error" in response) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
        reset();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(handlePasswordChange)}>
      <div className="inputSection">
        <EditableField
          label="Current Password"
          name="currentPassword"
          inputType={"password"}
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="New Password"
          name="newPassword"
          inputData={""}
          inputType={"password"}
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </div>
      <EditableField
        label="Confirm New Password"
        name="confirmPassword"
        inputType={"password"}
        inputData={""}
        isEditing={isEditing}
        register={register}
        errors={errors}
      />
      <button className="primaryBtn mt-3">Change Password</button>
    </form>
  );
}
