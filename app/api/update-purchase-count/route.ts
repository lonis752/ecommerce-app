import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { products } = await req.json(); // Expect an array of products with id and quantity

    // Iterate through each product and update the purchase count
    for (const product of products) {
      await updateProductPurchaseCount(product.id, product.quantity);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating purchase counts:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update purchase counts' }), { status: 500 });
  }
}

// Function to update purchase count in Stripe metadata
async function updateProductPurchaseCount(productId: string, quantity: number) {
  try {
    const product = await stripe.products.retrieve(productId);
    const currentCount = product.metadata.purchase_count
      ? parseInt(product.metadata.purchase_count)
      : 0;

    // Increment purchase count based on the quantity purchased
    const newCount = currentCount + quantity;

    // Update the product metadata with the new purchase count
    await stripe.products.update(productId, {
      metadata: { purchase_count: newCount.toString() },
    });

    console.log(`Updated purchase count for ${productId}: ${newCount}`);
  } catch (error) {
    console.error('Error updating purchase count:', error);
  }
}
