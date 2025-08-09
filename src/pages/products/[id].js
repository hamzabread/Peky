export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;
  let error = null;

  try {
    const res = await fetch(`http://localhost:5000/product/${id}`); // <-- updated route
    if (!res.ok) {
      error = `Product not found (status ${res.status})`;
    } else {
      const data = await res.json();
      if (data.success && data.product) {
        product = {
          ...data.product,
          ...data.type_details,
          image: data.images?.[0]?.image_url || "",
          price: data.product.price || "",
          description: data.product.description || "",
        };
      } else {
        error = data.message || "Product not found.";
      }
    }
  } catch (e) {
    error = "Failed to fetch product data";
  }

  return {
    props: { product, error },
  };
}

export default function ProductPage({ product, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <div>
      <h1>{product.title || product.name}</h1>
      <img src={product.image} alt={product.title || product.name} />
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
