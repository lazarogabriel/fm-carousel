import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, CardHeader, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleArrow from '../assets/icons/simpleArrow';

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

const FeaturedProducts = ({ title }) => {
  const pageSize = 4;
  const initPaginatedProducts = paginate(ProductsMock, pageSize, 1);
  const pages = initPaginatedProducts.pages;

  const [currentPage, setCurrentPage] = useState(initPaginatedProducts.page);
  const [productsPaginated, setProductsPaginated] = useState(initPaginatedProducts.items);

  const dots = Array.from({ length: pages }, (_, i) => i + 1);

  const [direction, setDirection] = useState(null);

  const handleNext = () => {
    setDirection("right");
    setCurrentPage(currentPage => {
      const nextPage = currentPage + 1;
      const page = nextPage > pages ? 1 : nextPage;
      setProductsPaginated(paginate(ProductsMock, pageSize, page).items);

      return page;
    });
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentPage(currentPage => {
      const prevPage = currentPage - 1;
      const page = prevPage <= 0 ? 1 : prevPage;
      setProductsPaginated(paginate(ProductsMock, pageSize, page).items);

      return page;
    });
  };

  const Product = ({ name, price, imageSrc }) => (
    <motion.div
      initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Card className="m-5 w-[280px] shadow-none" isPressable>
        <CardBody className="p-0">
          <div
            style={{
              backgroundImage: `url(${imageSrc})`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
            }} 
            alt={name} 
            className="w-[250px] h-[300px] rounded-none" 
          />
        </CardBody>
        <CardFooter className="pb-10">
          <div className="text-left">
            <p className="pb-3">{name}</p>
            <p className="font-semibold text-large">$ {price}</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const Products = () => (
    productsPaginated.map((product) => (
      <Product
        name={product.name}
        price={product.price}
        imageSrc={require(`../assets/products/${product.id}.png`)}
      />
  )));

  const Dots = () => (dots.map((page, _) => (<motion.div key={page} className={`dot ${currentPage === page ? "active" : ""}`}/>)))

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <div className="w-full flex justify-between">
              <h4 className="font-bold text-large m-2">{title}</h4>
            <div className="flex justify-between  gap-2 w-auto items-center m-4">
              <Dots />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex gap-5 mr-6">
            <AnimatePresence>
              <Products />
            </AnimatePresence>
          </div>
        </CardBody>
      </Card>
      <Button isIconOnly className="left-[-30px] productCarouselArrow" children={<SimpleArrow direction="left" />} onClick={handlePrevious} />
      <Button isIconOnly className="right-[-30px] productCarouselArrow" children={<SimpleArrow direction="right" />} onClick={handleNext} />
    </div>
  );
};

export default FeaturedProducts;

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const ProductsMock = [
  new Product(1, "Bolsa inteligente", 17000),
  new Product(2, "Taza logo", 13500),
  new Product(3, "Remera logo", 3200),
  new Product(4, "Maleta", 1110),
  new Product(5, "Tabla de cocina", 4100),
  new Product(6, "Vaso inteligente", 32000),
];
