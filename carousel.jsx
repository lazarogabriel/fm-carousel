import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";

const paginate = (array, pageSize, page) => {
  const items = array.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.ceil(array.length / pageSize);

  return { items, page, pages, pageSize };
}

const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
};
const slidersVariants = {
  hover: {
    scale: 1.2,
    backgroundColor: "#ff00008e",
  },
};
const dotsVariants = {
  initial: { y: 0 },
  animate: {
    y: 0,
    scale: 1.2,
    transition: { type: "spring", stiffness: 1000, damping: "10" },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const Carousel = ({ items }) => {
  const pageSize = 3;
  const initPaginatedItems = paginate(items, pageSize, 1);
  const pages = initPaginatedItems.pages;

  const [currentPage, setCurrentPage] = useState(initPaginatedItems.page);
  const [itemsPaginated, setItemsPaginated] = useState(initPaginatedItems.items);

  const dots = Array.from({ length: pages }, (_, i) => i + 1);

  const [direction, setDirection] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  const handleNext = () => {
    setDirection("right");
    setCurrentPage(currentPage => {
      const nextPage = currentPage + 1;
      const page = nextPage > pages ? 1 : nextPage;
      setItemsPaginated(paginate(items, pageSize, page).items);

      return page;
    });
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentPage(currentPage => {
      const prevPage = currentPage - 1;
      const page = prevPage <= 0 ? 1 : prevPage;
      setItemsPaginated(paginate(items, pageSize, page).items);

      return page;
    });
  };

  const handleDotClick = (page) => {
    setDirection(page > currentPage ? "right" : "left");
    setCurrentPage(page);
    setItemsPaginated(paginate(items, pageSize, page).items);
  };

  const Item = ({ src, key }) => {
    return src === undefined ? null :
      <div>
        <motion.img
          key={key}
          initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="h-[80px] w-auto grayscale !opacity-70"
          src={src}
          variants={slideVariants}
        />
      </div>
  };

  return (
    <div className="h-[200px]">

      <div className="flex flex-wrap justify-center sm:justify-between  gap-5 p-10">
        <AnimatePresence>
          {itemsPaginated.map((item, index) => <Item src={item} key={index} />)}
        </AnimatePresence>
      </div>

      <div className="carousel-indicator">
        {/* <Button children="<" onClick={handlePrevious} />
        <Button children=">" onClick={handleNext} /> */}
        {dots.map((page, _) => (
          <motion.div
            key={page}
            className={`dot ${currentPage === page ? "active" : ""}`}
            onClick={() => handleDotClick(page)}
            initial="initial"
            animate={currentPage === page ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          />
        ))}
      </div>

    </div>
  );
};
export default Carousel;
