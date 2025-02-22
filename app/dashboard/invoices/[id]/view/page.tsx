import AcmeLogo from "@/app/ui/acme-logo";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import postgres from "postgres";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "View Invoice",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

  const customer = await sql`
  SELECT customers.*
    FROM customers
  JOIN invoices ON customers.id = invoices.customer_id
  WHERE invoices.id = ${id}
  `;

  const invoice = await sql`
  SELECT invoices.*
    FROM invoices
  WHERE invoices.id = ${id}
  `;

  const date = Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  if (invoice.length == 0) notFound();

  console.log(customer);

  return (
    <div className="max-w-xl mx-auto space-y-5 bg-gray-50 p-5 rounded-md">
      <div className="flex justify-between flex-col-reverse md:flex-row">
        <div>
          <p className="text-xl font-bold">INVOICE</p>
          <p className="text-sm text-gray-500">{invoice[0].id}</p>
        </div>

        <AcmeLogo black />
      </div>

      <hr />

      <div className="grid md:grid-cols-2 gap-5 justify-between">
        <div>
          <p className="text-gray-500 mb-2">Customer</p>
          <p className="font-bold">{customer[0].name}</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">Date</p>
          <p className="font-bold">{date.format(invoice[0].date)}</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">Email</p>
          <p className="font-bold">{customer[0].email}</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">Status</p>
          <p className="font-bold capitalize">{invoice[0].status}</p>
        </div>
      </div>

      <hr />

      <div className="flex justify-between gap-6">
        <Link
          href="/dashboard/invoices/"
          className="flex justify-center items-center bg-gray-100 rounded-full size-8"
        >
          <ArrowUturnLeftIcon className="size-6" />
        </Link>

        <div className="flex gap-6">
          <p className="text-gray-500 mb-2">Amount</p>
          <p className="font-bold">${invoice[0].amount / 100}</p>
        </div>
      </div>
    </div>
  );
}
