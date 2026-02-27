import { getSingleProduct } from "@/Action/Server/Product";
import CartButton from "@/components/Buttons/CartButton";
import Image from "next/image";
import React from "react";


export async function generateMetadata({ params }) {
  const { id } =await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const {
    name,
    price,
    cottonType,
    sold,
    image,
    discount = 0,
  } = product;

  const discountPrice = price - (price * discount) / 100;

  const productUrl = `https://clover-clothing.vercel.app/products/${id}`;

  const description = `${name} made with premium ${cottonType}. ${
    discount > 0
      ? `Now available for ৳${discountPrice.toFixed(0)} (${discount}% OFF).`
      : `Available now for ৳${price}.`
  } Sold: ${sold} pieces. Order now!`;

  return {
    title: `${name} | Your Store Name`,
    description,
    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      url: productUrl,
      title: name,
      description,
      siteName: "Your Store Name",
      images: [
        {
          url: image || "https://i.ibb.co/60vvkRZ3/your-fallback.jpg",
          width: 1200,
          height: 1200,
          alt: name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [
        image || "https://i.ibb.co/60vvkRZ3/your-fallback.jpg",
      ],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        "max-image-preview": "large",
      },
    },
  };
}

const ProductDetails = async ({ params }) => {
  const { id } = await params; // no need to await
  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-red-500">
          Product Not Found
        </h2>
      </div>
    );
  }

  const {
    name,
    price,
    cottonType,
    sold,
    image,
    size,
    color,
    discount = 0,
  } = product;

  const discountPrice = price - (price * discount) / 100;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Product Image */}
        <div className="relative w-full h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-xl shadow-lg"
          />

          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold text-green-600">
                  ৳{discountPrice.toFixed(0)}
                </span>
                <span className="text-lg line-through text-gray-400">
                  ৳{product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-green-600">
                ৳{product.price}
              </span>
            )}
          </div>

          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">
                Cotton Type:
              </span>{" "}
              {product.cottonType}
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                Sold:
              </span>{" "}
              {sold} pieces
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                color:
              </span>{""}
              {product.color}
            </p>

          </div>

          <CartButton product={product}></CartButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;