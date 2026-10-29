"use client";

import { useEffect, useId, useRef, useState } from "react";
import { InfoIcon } from "@/components/icons";

/*
  Form messages under each field instead of the browser's bubbles. Used by every
  form on the site (components/AuthPanel.jsx, CheckoutView.jsx, RegistrationForm.jsx).

    const { formProps, fieldProps, errorFor } = useFieldErrors({ email: checkEmail });
    <form {...formProps} onSubmit={...}>
      <input name="email" required {...fieldProps("email")} />
      {errorFor("email")}

  - The browser's own checks still run (required, type="email", pattern, minLength…);
    their messages are rewritten in plain words (see messageFor) and shown by errorFor.
  - `checks` adds checks of our own: { [field name]: (value, form) => message or null }.
    They count like the browser's, so the form does not send while one fails.
  - A message appears when the form is sent, or when a filled-in field is left wrong;
    it goes away as soon as the field is right.
  - On sending, the cursor goes to the first field to fix.
  - `onSubmit` only runs once every field is right, as with the browser's checks.
*/

// The field's name as the student sees it: its <label>, aria-label or placeholder
function labelOf(field) {
  const label = field.labels?.[0];
  const text = label
    ? [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        ?.textContent
    : field.getAttribute("aria-label") || field.placeholder;
  return text?.trim() || "This field";
}

// A plain-words message for what is wrong with `field`. A field can set its own
// "missing" message with data-required="…".
function messageFor(field) {
  const { validity } = field;
  if (validity.customError) return field.validationMessage;
  if (validity.valueMissing) {
    if (field.dataset.required) return field.dataset.required;
    if (field.type === "checkbox") return "Please tick this box to continue.";
    return `${labelOf(field)} is required.`;
  }
  if (validity.typeMismatch && field.type === "email") return "Please enter a valid email address.";
  if (validity.patternMismatch) return field.title || "Please use the format shown.";
  if (validity.tooShort) return `Please use at least ${field.minLength} characters.`;
  if (validity.tooLong) return `Please use at most ${field.maxLength} characters.`;
  return field.validationMessage || "Please check this field.";
}

export function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-xs text-brand-orange">
      <InfoIcon className="mt-px size-3.5 shrink-0" />
      {children}
    </p>
  );
}

export default function useFieldErrors(checks = {}) {
  const baseId = useId();
  const formRef = useRef(null);
  const focusQueued = useRef(false);
  const [errors, setErrors] = useState({});
  const errorId = (name) => `${baseId}-${name}-error`;

  // Our own checks, as the fields' custom validity (cleared when they pass)
  function runChecks(form) {
    for (const [name, check] of Object.entries(checks)) {
      const field = form.elements.namedItem(name);
      if (field?.setCustomValidity) {
        field.setCustomValidity(check(field.value, form) || "");
      }
    }
  }

  // After every render: the checks may have changed (e.g. another screen of the form)
  useEffect(() => {
    if (formRef.current) runChecks(formRef.current);
  });

  // Refreshes the message of every field that has one: gone once right, updated if still wrong
  function refresh(form) {
    setErrors((shown) => {
      let changed = false;
      const next = { ...shown };
      for (const name of Object.keys(shown)) {
        const field = form.elements.namedItem(name);
        const message = field?.validity && !field.validity.valid ? messageFor(field) : undefined;
        if (message !== shown[name]) {
          next[name] = message;
          changed = true;
        }
      }
      return changed ? next : shown;
    });
  }

  function onEdit(event) {
    runChecks(event.currentTarget);
    refresh(event.currentTarget);
  }

  const formProps = {
    ref: formRef,
    onInputCapture: onEdit,
    onChangeCapture: onEdit,

    // Leaving a filled-in field that is wrong (e.g. half an email address) shows why
    onBlurCapture(event) {
      const field = event.target;
      if (!field.name || !field.validity || field.validity.valid || !field.value) return;
      setErrors((shown) => ({ ...shown, [field.name]: messageFor(field) }));
    },

    // Fired by the browser for each wrong field when the form is sent
    onInvalidCapture(event) {
      event.preventDefault(); // no bubble
      const field = event.target;
      if (field.name) {
        setErrors((shown) => ({ ...shown, [field.name]: messageFor(field) }));
      }
      // Once all of them have fired, go to the first one. A field that cannot take the
      // focus itself (tabIndex -1, e.g. components/CenterSelect.jsx) moves it on its own.
      if (!focusQueued.current) {
        focusQueued.current = true;
        queueMicrotask(() => {
          focusQueued.current = false;
          const first = [...field.form.elements].find(
            (element) => element.validity && !element.validity.valid && element.tagName !== "FIELDSET",
          );
          if (first && first.tabIndex !== -1) first.focus();
        });
      }
    },
  };

  // For the field: marks it wrong (aria-invalid, styled with aria-invalid:) and links its message
  const fieldProps = (name) =>
    errors[name]
      ? { "aria-invalid": true, "aria-describedby": errorId(name) }
      : {};

  const errorFor = (name) => <FieldError id={errorId(name)}>{errors[name]}</FieldError>;

  // Forgets every message, e.g. when the form shows another screen
  const clearErrors = () => setErrors({});

  return { formProps, fieldProps, errorFor, clearErrors };
}
