// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const res = await fetch(`http://localhost:5000/products/${id}`);
//   const product = await res.json();

//   return {
//     props: { product },
//   };
// }

// export default function ProductPage({ product }) {
//   return (
//     <div>
//       <h1>{product.title}</h1>
//       <img src={product.image} alt={product.title} />
//       <p>{product.description}</p>
//       <p>{product.price}</p>
//     </div>
//   );
// }
