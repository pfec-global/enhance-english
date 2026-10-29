"use client";

import PickerSelect from "@/components/PickerSelect";
import { MapPinIcon } from "@/components/icons";

const pin = (chosen) => (
  <span
    className={`grid size-8 place-items-center rounded-full ${
      chosen ? "bg-brand-orange text-white" : "bg-brand-orange/10 text-brand-orange"
    }`}
  >
    <MapPinIcon className="size-4" />
  </span>
);

/*
  The "Nearest Enhance English Center" picker of the checkout (components/CheckoutView.jsx):
  each centre with its address and phone. `centers` come from data/checkout.js; the chosen
  one's name is sent with the form as `name`. `fieldProps` from the form's useFieldErrors.
*/
export default function CenterSelect({ id, name, centers, fieldProps }) {
  return (
    <PickerSelect
      id={id}
      name={name}
      required
      requiredMessage="Please choose the centre nearest to you."
      placeholder="Choose Center"
      fieldProps={fieldProps}
      emptyIcon={pin(false)}
      options={centers.map((center) => ({
        value: center.name,
        label: center.name,
        detail: `${center.address.join(" ")} · ${center.phone}`,
        icon: pin(true),
      }))}
    />
  );
}
