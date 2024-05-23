import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { spacious,
  holiday,
  house,
  stylish,
  victorian,
  whiteChairs } from "assets";

const Video = () => {

  return (
    <section className="relative z-10 py-16 md:py-12 lg:py-16">
      <div className="container">
        <SectionTitle
          title="We are ready to help"
          paragraph=""
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <div className="grid gap-4">
                <div>
                  <Image className="h-auto max-w-full rounded-lg" src={holiday} alt="image" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div>
                  <Image className="h-auto max-w-full rounded-lg" src={house} alt="image" />
                  </div>
                  <div>
                  <Image className="h-auto max-w-full rounded-lg" src={spacious} alt="image" />
                  </div>
                  <div>
                  <Image className="h-auto max-w-full rounded-lg" src={stylish} alt="image" />
                  </div>
                  <div>
                  <Image className="h-auto max-w-full rounded-lg" src={victorian} alt="image" />
                  </div>
                  <div>
                  <Image className="h-auto max-w-full rounded-lg" src={whiteChairs} alt="image" />
                  </div>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
