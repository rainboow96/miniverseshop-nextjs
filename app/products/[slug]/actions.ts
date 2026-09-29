// app/products/[slug]/actions.ts
"use server";

import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(3, "متن نظر باید حداقل ۳ کاراکتر باشد."),
  slug: z.string().min(1),
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    comment?: string[];
    rating?: string[];
  };
};

export async function submitReviewAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "برای ثبت نظر ابتدا باید وارد حساب کاربری خود شوید.",
    };
  }

  const rawData = {
    productId: Number(formData.get("productId")),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
    slug: formData.get("slug"),
  };

  const validated = reviewSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "اطلاعات وارد شده معتبر نیست.",
    };
  }

  const { productId, rating, comment, slug } = validated.data;

  try {
    // ثبت یا ویرایش نظر کاربر برای این محصول
    await prisma.review.upsert({
      where: {
        productId_userId: {
          productId,
          userId: session.user.id,
        },
      },
      update: {
        rating,
        comment,
      },
      create: {
        productId,
        userId: session.user.id,
        rating,
        comment,
      },
    });

    // به‌روزرسانی کش صفحه محصول
    revalidatePath(`/products/${slug}`);

    return {
      success: true,
      message: "دیدگاه شما با موفقیت ثبت شد.",
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      message: "خطایی در ثبت نظر رخ داد. لطفاً دوباره تلاش کنید.",
    };
  }
}
