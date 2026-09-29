"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Star, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitReviewAction, type ActionState } from "@/app/products/[slug]/actions";

export interface ReviewItem {
  id: string | number;
  rating: number;
  comment: string;
  createdAt: Date | string;
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

interface ReviewsContentProps {
  reviews?: ReviewItem[];
  productId?: number;
  slug?: string;
  isLoggedIn?: boolean;
}

const initialState: ActionState = {};

export default function ReviewsContent({
  reviews = [],
  productId,
  slug = "",
  isLoggedIn = false,
}: ReviewsContentProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [state, formAction, isPending] = useActionState(submitReviewAction, initialState);

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-bold text-neutral-800">ثبت دیدگاه شما</h3>

        {!isLoggedIn ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-6 text-center text-sm text-neutral-500">
            برای ثبت دیدگاه، لطفاً ابتدا وارد حساب کاربری خود شوید.
          </div>
        ) : (
          <form action={formAction} className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50/30 p-5">
            {productId && <input type="hidden" name="productId" value={productId} />}
            <input type="hidden" name="slug" value={slug} />
            <input type="hidden" name="rating" value={rating} />

            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-500">
                امتیاز شما به این محصول:
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="mb-1.5 block text-xs font-medium text-neutral-500">
                متن دیدگاه:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                required
                placeholder="تجربه خود از کیفیت، اندازه و جنس این محصول را بنویسید..."
                className="w-full rounded-xl border border-neutral-200 bg-white p-3 text-sm focus:border-[#b5be9b] focus:outline-none focus:ring-2 focus:ring-[#b5be9b]/20"
              />
              {state?.errors?.comment && (
                <p className="mt-1 text-xs text-red-500">{state.errors.comment[0]}</p>
              )}
            </div>

            {state?.message && (
              <p className={`text-xs ${state.success ? "text-emerald-600" : "text-red-500"}`}>
                {state.message}
              </p>
            )}

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                "ثبت دیدگاه"
              )}
            </Button>
          </form>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-neutral-800">
          دیدگاه‌های کاربران ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-sm text-neutral-500">
            هنوز دیدگاهی برای این محصول ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.user?.image ? (
                      <Image
                        src={rev.user.image}
                        alt={rev.user.name || "کاربر"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">
                        {rev.user?.name || "کاربر مینی‌ورس"}
                      </p>
                      <span className="text-xs text-neutral-400">
                        {new Date(rev.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
