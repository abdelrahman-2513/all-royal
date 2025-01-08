import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardDefault } from "./MTCard";
import { motion } from "framer-motion";

export function CarouselSize({ items }: { items: any[] }) {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full flex flex-col items-center rounded-xl"
      >
        <CarouselContent className="w-[90vw] max-w-full bg-[transparent] md:gap-4">
          {items.length ? (
            items.map((p: any, index: number) => (
              <CarouselItem key={index} className="">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    duration: 0.8,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <CardDefault p={p} />
                </motion.div>
              </CarouselItem>
            ))
          ) : (
            <></>
          )}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
