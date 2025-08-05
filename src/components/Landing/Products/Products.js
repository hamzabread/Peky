import React from "react";

const Products = () => {

  const products = [
    {
        id: 1, image: "/assets/products/product1.png", title: "Aluminium Foil F1", description: "Durable and versatile aluminium foil for all your cooking needs.", price: "$10.00"
    },
    {
        id: 2, image: "/assets/products/product2.png", title: "Aluminium Foil F2", description: "Perfect for cooking and baking, this aluminium foil is a kitchen essential.", price: "$12.00"
    },
    {
        id: 3, image: "/assets/products/product3.png", title: "Aluminium Foil F3", description: "Ideal for storage and wrapping, keeping your food fresh.", price: "$15.00"
    },
    {
        id: 4, image: "/assets/products/product4.png", title: "Aluminium Foil F4", description: "High-quality aluminium foil for all your culinary needs.", price: "$20.00"
    }
  ]

  return (
    <>
      <section id="#products" className="bg-[#FCFCFC] py-[50px]">
        <div className="custom-container">
            <h2 className="text-[30px] font-bold">Our Products</h2>
            <div className="grid grid-cols-2 justify-center gap-[50px] pl-[100px] pr-[100px] pt-[50px]">
                {
                    products.map((product) => (
                        <div key={product.id} className="bg-white p-[20px] rounded-[10px] shadow-sm relative">
                            <img src={product.image} alt={product.title} className=" h-[200px] object-cover rounded-t-[10px]" />
                            <h3 className="text-[20px] font-bold mt-[10px]">{product.title}</h3>
                            <p className="text-[16px] font-semibold mt-[10px]">{product.price}</p>
                            <svg className="absolute bottom-[10px] right-[10px]" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/></svg>
                        </div>
                    ))
                }
            </div>
        </div>
      </section>
    </>
  );
};

export default Products;
