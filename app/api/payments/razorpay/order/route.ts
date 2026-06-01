import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      amountInr?: number;
      currency?: string;
      receipt?: string;
    };

    const amountInr = body.amountInr ?? 49;
    const amount = Number(amountInr);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount." },
        { status: 400 },
      );
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: body.currency ?? "INR",
      receipt: body.receipt ?? `invitehub-${Date.now()}`,
      notes: {
        product: "InviteHub premium plan",
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create order.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}