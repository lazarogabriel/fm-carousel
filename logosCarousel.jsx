import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const paginate = (array, pageSize, page) => {
  const items = array.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.ceil(array.length / pageSize);

  return { items, page, pages, pageSize };
}

const LogosCarousel = ({ items }) => {
  const pageSize = 1;
  const initPaginatedItems = paginate(items, pageSize, 1);
  const pages = initPaginatedItems.pages;

  const [itemsPaginated, setItemsPaginated] = useState(initPaginatedItems.items);
  
  useEffect(() => {
    let currentPage = 1;
    const interval = setInterval(() => {
      const nextPage = currentPage + 1;
      currentPage = nextPage > pages ? 1 : nextPage;
      
      setItemsPaginated(paginate(items, pageSize, currentPage).items);
    }, 4000);

    return () => clearInterval(interval);
  }, [setItemsPaginated, items, pages]);
  
  return (
    <div className="flex justify-center py-20">
      <AnimatePresence>
        {itemsPaginated.map((src, _) => {
          return <motion.div
            key={src}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 5 }}}
            exit={{ x: -400, opacity: 0, transition: { duration: 5 } }}
            className="absolute"
          >
            <img src={src} alt="logo" className="max-h-[100px] w-auto grayscale !opacity-70" />
          </motion.div>
        })}
      </AnimatePresence>
    </div>
  );
};

export default LogosCarousel;
