"use client";

import React, { useEffect } from "react";
import GeneralAvatar from "./GeneralAvatar";
import EditableField from "../../patient/_components/EditableField";
import { useEditSettings } from "@/store/useEditSettings";
import UpgradeAccount from "./UpgradeAccount";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { updateUser } from "@/app/actions/user";
import { UserSettingsDTO } from "@/types/user";

export default function GeneralSettings({
  userData,
}: {
  userData: UserSettingsDTO;
}) {
  const { isEditing, submit, setIsEditing } = useEditSettings();
  const [isPending, startTransition] = useTransition();
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    postalCode,
    country,
    address,
    profileImage,
  } = userData;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    const formatedData = {
      ...data,
      phone: Number(data.phone),
      postalCode: Number(data.postalCode),
    };
    startTransition(async () => {
      await updateUser(formatedData);
      setIsEditing(false);
    });
  }

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
    }
  }, [submit]);

  return (
    <div className="mt-2">
      <h1 className="settingsHeader">General Settings</h1>
      <GeneralAvatar profileImage={userData.profileImage ?? null} />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputSection">
          <EditableField
            label="First Name"
            name="firstName"
            inputData={firstName}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Last Name"
            name="lastName"
            inputData={lastName}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="Phone"
            name="phone"
            inputData={phone}
            inputType={"number"}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Email"
            name="email"
            inputData={email}
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
            inputData={country ?? null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="City"
            name="city"
            inputData={city ?? null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
        <div className="inputSection">
          <EditableField
            label="Address"
            name="address"
            inputData={address ?? null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <EditableField
            label="Postal Code"
            name="postalCode"
            inputData={postalCode ?? null}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>
      </form>
      <div className="line mt-5"></div>
      <UpgradeAccount />
    </div>
  );
}
