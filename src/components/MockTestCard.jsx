import Image from "next/image";
import Button from "@/components/Button";
import { BulbIcon } from "@/components/icons";

export default function MockTestCard({ mockTests }) {
  return (
    <article className="flex h-full flex-col border border-black/15 bg-[#fdf7e3] p-6 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]">
      <div className="flex items-center gap-2">
        <Image
          src="/image/ielts_logo.png"
          alt="IELTS"
          width={253}
          height={100}
          className="h-9 w-auto"
        />
        <Image
          src="/image/pearson_logo.png"
          alt="Pearson PTE"
          width={253}
          height={100}
          className="h-9 w-auto"
        />
      </div>

      <h3 className="mt-3 text-[1.375rem] leading-tight font-semibold">
        Paper Based
        <br />
        Mock Tests
      </h3>

      <ul className="mt-3 text-[1.0625rem]">
        {mockTests.packages.map((item) => (
          <li
            key={item.label}
            className="flex justify-between border-b border-black/10 py-3"
          >
            {item.label}
            <strong>৳{item.price}</strong>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-2 rounded-lg border border-brand-yellow/50 bg-[#fffae8] p-3">
        <BulbIcon className="size-5 shrink-0" strokeWidth={1.5} />
        <p className="text-xs">
          <strong className="block text-[0.8125rem]">
            Want More Mock Tests?
          </strong>
          You can change the quantity before making the payment.
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
        <Button href={`${mockTests.href}#buy`}>Buy Now</Button>
        <Button href={mockTests.href} variant="outline">
          Learn More
        </Button>
      </div>
    </article>
  );
}
