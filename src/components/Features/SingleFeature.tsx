import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="group w-full">
      <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
        {paragraph}
      </p>
    </div>
  );
};

export default SingleFeature;
