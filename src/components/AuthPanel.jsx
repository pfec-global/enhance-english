"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/Toaster";
import useFieldErrors, { FieldError } from "@/hooks/useFieldErrors";
import {
  CircleCheckIcon,
  CircleXIcon,
  EyeIcon,
  EyeOffIcon,
} from "@/components/icons";
import {
  resendCode,
  resetPassword,
  sendRecoveryCode,
  signIn,
  signUp,
  verifyRecoveryCode,
  verifySignUp,
} from "@/lib/auth";

// The top of the card: students in arches, with soft empty circles between them
const students = [
  { image: "/image/avater_image_1.png", color: "bg-brand-orange" },
  {},
  { image: "/image/avater.webp", color: "bg-brand-orange" },
  {},
  {},
  { image: "/image/avater_image_2.png", color: "bg-brand-blue" },
  {},
  { image: "/image/avater_1.png", color: "bg-brand-blue" },
];

// The rules a new password has to meet, ticked off while it is typed
const passwordRules = [
  { label: "One Uppercase Alphabet", test: (value) => /[A-Z]/.test(value) },
  { label: "One Lowercase Alphabet", test: (value) => /[a-z]/.test(value) },
  { label: "One Number", test: (value) => /\d/.test(value) },
  {
    label: "One Special Character",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
  { label: "Minimum 8 Characters Long", test: (value) => value.length >= 8 },
];

const CODE_LENGTH = 6;
const RESEND_WAIT = 30; // seconds before another code can be asked for

// "Sarvesh Sharma" -> "Sarvesh", for the welcome messages
const firstName = (student) => student?.name?.trim().split(/\s+/)[0];

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^\+?[\d\s-]{7,16}$/.test(value);

const label = "mb-1.5 block text-sm font-bold";
const field =
  "w-full rounded-lg border border-black/10 bg-[#f3f3f3] px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20 aria-invalid:border-brand-orange aria-invalid:bg-brand-orange/5";
const primaryButton =
  "w-full cursor-pointer rounded-lg border border-brand-orange bg-brand-orange py-2.5 font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange disabled:cursor-wait disabled:opacity-70";
const outlineButton =
  "w-full cursor-pointer rounded-lg border border-brand-orange bg-white py-2.5 text-sm transition-colors hover:bg-brand-orange/5";
const textLink =
  "cursor-pointer text-brand-orange underline underline-offset-2 hover:no-underline disabled:cursor-default disabled:text-ink/50 disabled:no-underline";

function StudentsBanner() {
  return (
    <div className="grid grid-cols-4 gap-2 bg-[#fdeceb] px-4 pt-10 pb-8 sm:gap-3">
      {students.map((student, index) =>
        student.image ? (
          <div
            key={index}
            className={`relative aspect-square overflow-hidden rounded-t-full ${student.color}`}
          >
            <Image
              src={student.image}
              alt=""
              fill
              sizes="110px"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div
            key={index}
            className="aspect-square rounded-full bg-[#d6cfe4]"
          />
        ),
      )}
    </div>
  );
}

// "Sign In" / "Create New Account": the current one is the orange tab, in front
function Tabs({ current, onChange }) {
  const tabs = [
    { view: "signin", label: "Sign In" },
    { view: "signup", label: "Create New Account" },
  ];
  if (current === "signup") tabs.reverse();

  return (
    <div className="mb-4 flex items-center gap-4 text-sm font-semibold">
      {tabs.map((tab) =>
        tab.view === current ? (
          <span
            key={tab.view}
            className="bg-brand-orange px-3 py-2 text-white underline underline-offset-2"
          >
            {tab.label}
          </span>
        ) : (
          <button
            key={tab.view}
            type="button"
            onClick={() => onChange(tab.view)}
            className="cursor-pointer underline underline-offset-2 hover:text-brand-orange"
          >
            {tab.label}
          </button>
        ),
      )}
    </div>
  );
}

// A labelled field with its message under it (`error`, from useFieldErrors)
function Field({ title, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {title}
      </label>
      {children}
      {error}
    </div>
  );
}

// A password box with a button that shows or hides what was typed
function PasswordInput(props) {
  const [shown, setShown] = useState(false);
  const Eye = shown ? EyeOffIcon : EyeIcon;

  return (
    <div className="relative">
      <input
        type={shown ? "text" : "password"}
        placeholder="Enter Password"
        required
        className={`${field} pr-11`}
        {...props}
      />
      <button
        type="button"
        aria-label={shown ? "Hide password" : "Show password"}
        onClick={() => setShown(!shown)}
        className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center text-ink/50 hover:text-brand-orange"
      >
        <Eye className="size-4" />
      </button>
    </div>
  );
}

/*
  Six boxes for the secret code, one digit each. Typing moves on to the next box,
  Backspace back; a pasted (or autofilled) code fills them all. The code is always
  filled from the left, so a click on any box goes to the first empty one.
*/
function CodeInput({ value, onChange, labelledBy, describedBy }) {
  const group = useRef(null);
  const boxes = useRef([]);

  const focusBox = (index) =>
    boxes.current[Math.min(index, CODE_LENGTH - 1)]?.focus();

  // Once a digit is added or removed, the cursor moves to the next empty box.
  // Done after the change is drawn, so the box's onFocus sees the new code.
  useEffect(() => {
    if (group.current.contains(document.activeElement)) focusBox(value.length);
  }, [value]);

  function put(index, text) {
    const digits = text.replace(/\D/g, "");
    if (!digits) return;
    onChange((value.slice(0, index) + digits).slice(0, CODE_LENGTH));
  }

  return (
    <div
      ref={group}
      role="group"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className="flex gap-2"
    >
      {Array.from({ length: CODE_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(box) => (boxes.current[index] = box)}
          value={value[index] ?? ""}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={index === 0}
          aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
          aria-invalid={describedBy ? true : undefined}
          onFocus={() => index > value.length && focusBox(value.length)}
          onChange={(event) =>
            put(index, event.target.value.replace(value[index] ?? "", ""))
          }
          onKeyDown={(event) => {
            if (event.key !== "Backspace") return;
            event.preventDefault();
            onChange(value.slice(0, -1));
          }}
          onPaste={(event) => {
            event.preventDefault();
            put(0, event.clipboardData.getData("text"));
          }}
          className="size-10 rounded-md border border-black/10 bg-[#f3f3f3] text-center text-lg font-semibold outline-none focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20 aria-invalid:border-brand-orange aria-invalid:bg-brand-orange/5 sm:size-11"
        />
      ))}
    </div>
  );
}

function PasswordRules({ password }) {
  return (
    <div>
      <p className="text-sm font-bold">Your Password must contain</p>
      <ul className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {passwordRules.map((rule) => {
          const met = rule.test(password);
          const Mark = met ? CircleCheckIcon : CircleXIcon;
          return (
            <li key={rule.label} className="flex items-center gap-1.5">
              <Mark
                className={`size-3.5 shrink-0 ${met ? "text-green-600" : "text-brand-orange"}`}
              />
              <span>
                {rule.label}
                <span className="sr-only">
                  {met ? " (done)" : " (missing)"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-sm text-brand-orange">
      {children}
    </p>
  );
}

const Title = ({ id, children }) => (
  <h2 id={id} className="text-xl leading-snug font-bold sm:text-2xl">
    {children}
  </h2>
);

// The "Secret Code sent!" step, after signing up and when recovering a password
function CodeStep({
  login,
  purpose,
  buttonLabel,
  titleId,
  busy,
  error,
  run,
  onVerify,
  onChangeLogin,
}) {
  const [code, setCode] = useState("");
  const [wait, setWait] = useState(RESEND_WAIT);
  const [codeError, setCodeError] = useState(null);
  const email = isEmail(login);
  // A short code, or the admin turning the code down, is shown under the boxes
  const shownError = codeError ?? error;

  // Counts down the seconds until another code can be asked for
  useEffect(() => {
    if (!wait) return;
    const timer = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (code.length < CODE_LENGTH) {
          setCodeError(`Please enter all ${CODE_LENGTH} digits of the code.`);
          return;
        }
        run(() => onVerify(code));
      }}
      className="grid gap-4"
    >
      <div>
        <Title id={titleId}>Secret Code sent!🔑</Title>
        <p className="mt-1.5 text-sm text-ink/75">
          {email ? "Check the inbox/spam folder of " : "Check the messages on "}
          <strong className="text-ink">{login}</strong> to see the one time
          secret code
        </p>
      </div>

      <div>
        <p id="auth-code-label" className={label}>
          Enter Secret Code
        </p>
        <CodeInput
          value={code}
          onChange={(next) => {
            setCode(next);
            setCodeError(null);
          }}
          labelledBy="auth-code-label"
          describedBy={shownError ? "auth-code-error" : undefined}
        />
        <FieldError id="auth-code-error">{shownError}</FieldError>
      </div>

      <div className="grid gap-2 text-sm text-ink/75">
        <p>Secret Code is valid only for 5 Mins</p>
        <p aria-live="polite">
          Didn&apos;t Receive the Code?{" "}
          <button
            type="button"
            disabled={wait > 0}
            onClick={() =>
              run(async () => {
                try {
                  await resendCode({ login, purpose });
                } catch (failure) {
                  // Asked too often: count down the wait the admin gave ("Please wait 40 seconds…")
                  const [, amount, unit] =
                    failure.message.match(/(\d+) (second|minute)/) ?? [];
                  if (amount)
                    setWait(Number(amount) * (unit === "minute" ? 60 : 1));
                  throw failure;
                }
                setCode("");
                setWait(RESEND_WAIT);
                showToast({
                  title: "New secret code sent",
                  text: `We've emailed a new 6-digit code${email ? ` to ${login}` : ""}.`,
                });
              })
            }
            className={textLink}
          >
            {wait > 0 ? `Resend in ${wait}s` : "Resend"}
          </button>
        </p>
      </div>

      <button type="submit" disabled={busy} className={primaryButton}>
        {busy ? "Please wait…" : buttonLabel}
      </button>
      <p className="text-center text-sm">
        Your {email ? "Email ID" : "Mobile Number"} isn&apos;t{" "}
        <strong>{login}</strong>?
      </p>
      <button type="button" onClick={onChangeLogin} className={outlineButton}>
        Change {email ? "Email Address" : "Mobile Number"}
      </button>
    </form>
  );
}

// Checks of the fields, shown under them (see useFieldErrors). Empty fields are
// left to `required`, so they say "… is required." instead.
// Sign-up only: the secret code is emailed, so a new account uses its email address
const checkSignUpEmail = (value) =>
  value.trim() && !isEmail(value.trim())
    ? "Please use your email address as the Login ID. We send the secret code there."
    : null;

const checkLogin = (value) =>
  value.trim() && !isEmail(value.trim()) && !isMobile(value.trim())
    ? "Please enter a valid email ID or mobile number."
    : null;

function checkNewPassword(value) {
  const missing = passwordRules.filter((rule) => !rule.test(value));
  return value && missing.length
    ? `Your password needs: ${missing.map((rule) => rule.label.toLowerCase()).join(", ")}.`
    : null;
}

const checkConfirm = (value, form) =>
  value && value !== form.elements.namedItem("password").value
    ? "The two passwords do not match."
    : null;

// Which checks each screen's form has
const screenChecks = {
  signin: { login: checkLogin },
  signup: {
    login: checkSignUpEmail,
    password: checkNewPassword,
    confirm: checkConfirm,
  },
  forgot: { login: checkLogin },
  reset: { password: checkNewPassword, confirm: checkConfirm },
};

/*
  Student sign-in, sign-up and password recovery, on one card with the students
  across the top. In the pop-up (components/AuthModal.jsx) and on /login and /register.
  Screens (`view`):
  - signin: Login ID (email or mobile) and password
  - signup → signup-code: the details, then the secret code sent to the Login ID
  - forgot → forgot-code → reset: the Login ID, the secret code, a new password
  `initialView` is "signin" or "signup"; `titleId` is the id of every screen's heading.
  The calls to the admin are in lib/auth.js.
*/
export default function AuthPanel({
  initialView = "signin",
  titleId = "auth-title",
}) {
  const router = useRouter();
  const card = useRef(null);
  const [view, setView] = useState(initialView);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  // What was typed in, kept when moving between screens (e.g. "Change Email Address")
  const [details, setDetails] = useState({ login: "", name: "", phone: "" });
  const [resetToken, setResetToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const { formProps, fieldProps, errorFor, clearErrors } = useFieldErrors(
    screenChecks[view],
  );

  function go(next) {
    setError(null);
    clearErrors();
    setView(next);
  }

  // Runs `action`, showing "Please wait…" meanwhile and its error message if it fails
  async function run(action) {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  // Signed in: the pop-up closes and the student goes to their profile (app/profile/page.js)
  function done() {
    card.current?.closest("dialog")?.close();
    router.push("/profile");
    // The profile is built on the server from the new sign-in cookie
    router.refresh();
  }

  const values = (event) =>
    Object.fromEntries(new FormData(event.currentTarget));

  return (
    <div
      ref={card}
      className="overflow-hidden border border-black/15 bg-white shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)]"
    >
      <StudentsBanner />

      <div className="relative -mt-4 rounded-t-2xl bg-white px-5 pt-5 pb-6 sm:px-6">
        {(view === "signin" || view === "signup" || view === "signup-code") && (
          <Tabs
            current={view === "signin" ? "signin" : "signup"}
            onChange={go}
          />
        )}

        {view === "signin" && (
          <form
            {...formProps}
            onSubmit={(event) => {
              event.preventDefault();
              const { login, password } = values(event);
              run(async () => {
                const { student } = await signIn({
                  login: login.trim(),
                  password,
                });
                showToast({
                  title: `Welcome back${firstName(student) ? `, ${firstName(student)}` : ""}!`,
                  text: "You are now logged in.",
                });
                done();
              });
            }}
            className="grid gap-4"
          >
            <Title id={titleId}>Login to an Existing Account</Title>
            <Field title="Login ID" id="auth-login" error={errorFor("login")}>
              <input
                id="auth-login"
                name="login"
                {...fieldProps("login")}
                defaultValue={details.login}
                onChange={(event) =>
                  setDetails({ ...details, login: event.target.value })
                }
                placeholder="Enter your Email ID / Mobile Number"
                autoComplete="username"
                autoFocus
                required
                className={field}
              />
            </Field>
            <Field
              title="Password"
              id="auth-password"
              error={errorFor("password")}
            >
              <PasswordInput
                id="auth-password"
                name="password"
                {...fieldProps("password")}
                autoComplete="current-password"
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={() => go("forgot")}
                className={textLink}
              >
                Forgot Password
              </button>
              <span className="text-ink/75">
                Don&apos;t Have an Account?{" "}
                <button
                  type="button"
                  onClick={() => go("signup")}
                  className={textLink}
                >
                  Register
                </button>
              </span>
            </div>
            <ErrorText>{error}</ErrorText>
            <button type="submit" disabled={busy} className={primaryButton}>
              {busy ? "Please wait…" : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => go("signup")}
              className={outlineButton}
            >
              Don&apos;t Have an Account? <strong>Create</strong>
            </button>
          </form>
        )}

        {view === "signup" && (
          <form
            {...formProps}
            onSubmit={(event) => {
              event.preventDefault();
              const { password, confirm, ...form } = values(event);
              const next = {
                ...form,
                login: form.login.trim(),
                name: form.name.trim(),
              };
              setDetails(next);
              run(async () => {
                await signUp({ ...next, password });
                showToast({
                  title: "Secret code sent",
                  text: `We've emailed a 6-digit code to ${next.login}.`,
                });
                go("signup-code");
              });
            }}
            className="grid gap-4"
          >
            <Title id={titleId}>
              Create a New Account with Enhance English
            </Title>
            <Field title="Login ID" id="auth-login" error={errorFor("login")}>
              <input
                id="auth-login"
                name="login"
                {...fieldProps("login")}
                defaultValue={details.login}
                type="email"
                placeholder="Enter your Email ID"
                autoComplete="email"
                autoFocus
                required
                className={field}
              />
            </Field>
            <Field title="Full Name" id="auth-name" error={errorFor("name")}>
              <input
                id="auth-name"
                name="name"
                {...fieldProps("name")}
                defaultValue={details.name}
                placeholder="Enter your Full Name"
                autoComplete="name"
                required
                className={field}
              />
            </Field>
            <Field
              title="Contact Number"
              id="auth-phone"
              error={errorFor("phone")}
            >
              <input
                id="auth-phone"
                name="phone"
                {...fieldProps("phone")}
                type="tel"
                defaultValue={details.phone}
                placeholder="Enter Phone Number"
                autoComplete="tel"
                pattern="\+?[\d\s\-]{6,16}"
                title="Digits only, optionally starting with + and the country code"
                required
                className={field}
              />
            </Field>
            <Field
              title="Create a New Password"
              id="auth-password"
              error={errorFor("password")}
            >
              <PasswordInput
                id="auth-password"
                name="password"
                {...fieldProps("password")}
                autoComplete="new-password"
              />
            </Field>
            <Field
              title="Confirm Password"
              id="auth-confirm"
              error={errorFor("confirm")}
            >
              <PasswordInput
                id="auth-confirm"
                name="confirm"
                {...fieldProps("confirm")}
                autoComplete="new-password"
                placeholder="Re-enter Password"
              />
            </Field>
            <ErrorText>{error}</ErrorText>
            <button type="submit" disabled={busy} className={primaryButton}>
              {busy ? "Please wait…" : "Sign Up"}
            </button>
          </form>
        )}

        {view === "signup-code" && (
          <CodeStep
            login={details.login}
            purpose="register"
            buttonLabel="Verify & Sign Up"
            titleId={titleId}
            busy={busy}
            error={error}
            run={run}
            onVerify={async (code) => {
              const { student } = await verifySignUp({
                login: details.login,
                code,
              });
              showToast({
                title: "Account verified",
                text: `Welcome to Enhance English${firstName(student) ? `, ${firstName(student)}` : ""}!`,
              });
              done();
            }}
            onChangeLogin={() => go("signup")}
          />
        )}

        {view === "forgot" && (
          <form
            {...formProps}
            onSubmit={(event) => {
              event.preventDefault();
              const login = values(event).login.trim();
              setDetails({ ...details, login });
              run(async () => {
                await sendRecoveryCode({ login });
                showToast({
                  title: "Secret code sent",
                  text: "If this Login ID has an account, we've emailed a 6-digit code to its email address.",
                });
                go("forgot-code");
              });
            }}
            className="grid gap-4"
          >
            <Title id={titleId}>Recover your Account</Title>
            <Field title="Login ID" id="auth-login" error={errorFor("login")}>
              <input
                id="auth-login"
                name="login"
                {...fieldProps("login")}
                defaultValue={details.login}
                placeholder="Enter your Email ID / Mobile Number"
                autoComplete="username"
                autoFocus
                required
                className={field}
              />
            </Field>
            <ErrorText>{error}</ErrorText>
            <button type="submit" disabled={busy} className={primaryButton}>
              {busy ? "Please wait…" : "Send Secret Code"}
            </button>
            <button
              type="button"
              onClick={() => go("signin")}
              className={outlineButton}
            >
              Back to Login Page
            </button>
          </form>
        )}

        {view === "forgot-code" && (
          <CodeStep
            login={details.login}
            purpose="password"
            buttonLabel="Verify Code"
            titleId={titleId}
            busy={busy}
            error={error}
            run={run}
            onVerify={async (code) => {
              const { token } = await verifyRecoveryCode({
                login: details.login,
                code,
              });
              setResetToken(token);
              showToast({
                title: "Code verified",
                text: "Now set your new password.",
              });
              go("reset");
            }}
            onChangeLogin={() => go("forgot")}
          />
        )}

        {view === "reset" && (
          <form
            {...formProps}
            onSubmit={(event) => {
              event.preventDefault();
              const { password } = values(event);
              run(async () => {
                await resetPassword({
                  login: details.login,
                  token: resetToken,
                  password,
                });
                await signIn({ login: details.login, password });
                showToast({
                  title: "Password changed",
                  text: "You are now logged in with your new password.",
                });
                done();
              });
            }}
            className="grid gap-4"
          >
            <div>
              <Title id={titleId}>Set Up Your Password</Title>
              <p className="mt-1.5 text-sm text-ink/75">
                Your account has been verified successfully! It&apos;s time to
                set up your login password
              </p>
            </div>
            {/* The Login ID, for password managers to save the new password under */}
            <input
              type="hidden"
              name="username"
              autoComplete="username"
              value={details.login}
            />
            <Field
              title="Create a New Password"
              id="auth-password"
              error={errorFor("password")}
            >
              <PasswordInput
                id="auth-password"
                name="password"
                {...fieldProps("password")}
                autoComplete="new-password"
                autoFocus
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </Field>
            <Field
              title="Re-enter Password"
              id="auth-confirm"
              error={errorFor("confirm")}
            >
              <PasswordInput
                id="auth-confirm"
                name="confirm"
                {...fieldProps("confirm")}
                autoComplete="new-password"
              />
            </Field>
            <PasswordRules password={newPassword} />
            <ErrorText>{error}</ErrorText>
            <button type="submit" disabled={busy} className={primaryButton}>
              {busy ? "Please wait…" : "Verify & Sign In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
