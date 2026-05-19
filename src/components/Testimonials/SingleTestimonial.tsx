import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full">
      <div className="rounded-card bg-white p-8 shadow-two transition-shadow duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        {/* Stars */}
        <div className="mb-5 flex items-center gap-1">
          {Array.from({ length: star }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow text-yellow"
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Content */}
        <p className="mb-8 border-b border-body-color/10 pb-8 text-base leading-relaxed text-body-color dark:border-white/10 dark:text-white">
          &ldquo;{content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="mb-0.5 text-base font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
              {name}
            </h3>
            <p className="text-sm text-body-color dark:text-body-color-dark">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
