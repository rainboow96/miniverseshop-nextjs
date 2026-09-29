"use client";

import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { HelpCircle } from "lucide-react";

import iranStatesCitiesData from "@/components/data/iranStatesCities.json";
import { CheckoutFormValues, FormErrors, IranStatesCities } from "./types";
import { FormInput, FormSelect } from "./fields";
import { inputClass, labelClass } from "./styles";

const IRAN = iranStatesCitiesData as unknown as IranStatesCities;

interface CheckoutFormProps {
  initialUser?: {
    name?: string | null;
    email?: string | null;
  };
}

export default function CheckoutForm({ initialUser }: CheckoutFormProps) {
  const splitName = initialUser?.name?.split(" ") ?? [];
  const initialFirstName = splitName[0] ?? "";
  const initialLastName = splitName.slice(1).join(" ") ?? "";

  const [formData, setFormData] = useState<CheckoutFormValues>({
    firstName: initialFirstName,
    lastName: initialLastName,
    country: "iran",
    state: "",
    city: "",
    address: "",
    phone: "",
    postalCode: "",
    email: initialUser?.email ?? "",
    orderNote: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const stateOptions = useMemo(() => {
    return Object.keys(IRAN).map((state) => ({
      label: state,
      value: state,
    }));
  }, []);

  const cityOptions = useMemo(() => {
    const list = IRAN[formData.state] ?? [];
    return list.map((city) => ({
      label: city,
      value: city,
    }));
  }, [formData.state]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // اگر استان عوض شد، مقدار شهر خالی شود
      if (name === "state") {
        return { ...prev, state: value, city: "" };
      }
      return { ...prev, [name]: value };
    });

    // پاک کردن ارور هنگام تایپ
    if (errors[name as keyof CheckoutFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "وارد کردن نام الزامی است";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "وارد کردن نام خانوادگی الزامی است";
    }
    if (!formData.state) {
      newErrors.state = "انتخاب استان الزامی است";
    }
    if (!formData.city) {
      newErrors.city = "انتخاب شهر الزامی است";
    }
    if (!formData.address.trim()) {
      newErrors.address = "وارد کردن آدرس الزامی است";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "وارد کردن شماره تلفن الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن باید با 09 شروع شود و ۱۱ رقم باشد";
    }
    if (formData.postalCode.trim() && !/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("اطلاعات ثبت‌شده سفارش:", formData);
    alert("اطلاعات شما با موفقیت ثبت شد.");
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-8 border-b pb-4 text-right text-xl font-bold text-gray-800">
          اطلاعات شما
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            id="firstName"
            name="firstName"
            label="نام"
            required
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <FormInput
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            required
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <div className="text-right md:col-span-2">
            <label className={labelClass} htmlFor="country">
              کشور / منطقه <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              disabled
              value="iran"
              className={inputClass(false)}
            >
              <option value="iran">ایران</option>
            </select>
          </div>

          <FormSelect
            id="state"
            name="state"
            label="استان"
            required
            placeholderOption="انتخاب استان"
            options={stateOptions}
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
          />

          <FormSelect
            id="city"
            name="city"
            label="شهر"
            required
            disabled={!formData.state || cityOptions.length === 0}
            placeholderOption={
              formData.state ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"
            }
            options={cityOptions}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <div className="md:col-span-2">
            <FormInput
              id="address"
              name="address"
              label="خیابان"
              placeholder="پلاک خانه و نام خیابان"
              required
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              id="phone"
              name="phone"
              label="تلفن"
              type="tel"
              dir="ltr"
              placeholder="09123456789"
              className="text-left"
              required
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              id="postalCode"
              name="postalCode"
              label="کد پستی"
              type="text"
              dir="ltr"
              optional
              className="text-left"
              value={formData.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              id="email"
              name="email"
              label="ایمیل"
              type="email"
              dir="ltr"
              optional
              className="text-left"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 border-b pb-4 text-right text-xl font-bold text-gray-800">
            توضیحات تکمیلی
          </h2>

          <div className="text-right">
            <label className={labelClass} htmlFor="orderNote">
              یادداشت سفارش{" "}
              <span className="text-[10px] text-gray-400 font-normal">
                (اختیاری)
              </span>
            </label>
            <textarea
              id="orderNote"
              name="orderNote"
              rows={4}
              placeholder="نکات ویژه برای تحویل..."
              value={formData.orderNote}
              onChange={handleChange}
              className={`${inputClass(false)} resize-none`}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-400">
          <HelpCircle className="h-4 w-4" />
          <span>اطلاعات شما فقط برای ارسال سفارش استفاده می‌شود.</span>
        </div>
      </div>
    </form>
  );
}
