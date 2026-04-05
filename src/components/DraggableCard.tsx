import { motion, type MotionProps } from "framer-motion";

type DraggableCardSize = {
  width: number | string;
  height: number | string;
};

type DraggableCardPosition = {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
};

interface DraggableCardProps extends MotionProps {
  imageUrl: string;
  size?: DraggableCardSize;
  position?: DraggableCardPosition;
  className?: string;
}

export default function DraggableCard({
  imageUrl,
  size = { width: 400, height: 420 },
  position,
  className,
  style,
  dragConstraints,
  ...motionProps
}: DraggableCardProps) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg cursor-grab overflow-hidden select-none ${
        className ?? ""
      }`}
      style={{
        ...position,
        width: size.width,
        height: size.height,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.2}
      dragMomentum
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...motionProps}
    />
  );
}
