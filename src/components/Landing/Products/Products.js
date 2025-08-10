import Link from "next/link";
import { API_URL } from "@/lib/config";

export default async function Products() {
  let products = [];

  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: "no-store", // always fresh data
      next: { revalidate: 0 }, // disable ISR
    });

    if (
      res.ok &&
      res.headers.get("content-type")?.includes("application/json")
    ) {
      products = await res.json();
    } else {
      console.warn("Unexpected response from /products:", res.status);
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <section id="Buy" className="bg-[#FBFBFB] pt-[60px] pb-[60px]">
      <div className="custom-container">
        <h2 className="text-[35px] md:text-[45px] text-center !mb-[30px] font-bold">
          Our Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Products are loading or unavailable. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-[10px] md:gap-[60px] !pt-[30px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white pb-[20px] rounded-[10px] border-[1px] border-gray-600 overflow-hidden relative cursor-pointer"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[200px] md:!h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[18px] pr-[15px] pl-[15px] sm:!text-[20px] font-bold !mt-[15px]">
                    {product.title}
                  </h3>
                  <p className="text-[14px] pr-[15px] pl-[15px] sm:!text-[16px] font-semibold !mt-[5px]">
                    {product.price}
                  </p>
                  <svg
                    className="absolute bottom-[30px] right-[10px] cursor-pointer"
                    width="30px"
                    height="30px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
