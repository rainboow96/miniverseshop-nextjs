import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-bold transition-all duration-300 active:scale-95 hover:scale-105 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-gradient-to-b from-[#3F5236] to-[#25311C] text-[#F3EBDA] shadow-[0_8px_16px_rgba(37,49,28,0.35)] hover:from-[#4a6040] hover:to-[#2c3a22]",
        secondary:
          "rounded-full bg-[#D4AF37] text-[#424127] hover:bg-[#BE9828] hover:text-[#2F2618]",
        outline:
          "rounded-full border-2 border-[#424127] text-[#424127] bg-transparent hover:bg-[#424127] hover:text-white",
        filter:
          "rounded-full bg-transparent p-0 shadow-none hover:text-[#e46d78] hover:scale-100",
        icon:
          "rounded-full bg-[#424127] text-white shadow-none hover:bg-[#4a512d] p-2",
        cart:
          "rounded-md bg-gradient-to-b from-[#3F5236] to-[#25311C] text-[#F3EBDA] shadow-[0_8px_16px_rgba(37,49,28,0.35)] hover:from-[#4a6040] hover:to-[#2c3a22]",
        tab:
          "rounded-full bg-gradient-to-b from-[#3F5236] to-[#25311C] text-[#F3EBDA] shadow-[0_8px_16px_rgba(37,49,28,0.35)] hover:from-[#4a6040] hover:to-[#2c3a22]",
        "tab-active":
          "rounded-full bg-gradient-to-b from-[#AEB99A] to-[#B9C4A5] text-white shadow-[0_8px_16px_rgba(37,49,28,0.18)]",
      },
      size: {
        default: "px-5 py-2 text-sm",
        sm: "px-4 py-1.5 text-xs",
        lg: "px-8 py-3 text-base",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  active?: boolean
}

function Button({
  className,
  variant = "primary",
  size = "default",
  active = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const finalVariant = variant === "tab" && active ? "tab-active" : variant

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant: finalVariant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
