import Image from "next/image";
import Link from "next/link";

export interface Category {
  name: string;
  image: string;
  href?: string;
}

export interface CategoryGridProps {
  title?: string;
  categories?: Category[];
}

const defaultCategories: Category[] = [
  {
    name: "Laptops",
    image: "/laptops/electronic-3.jpg",
    href: "#",
  },
  {
    name: "Computer Accessories",
    image: "/laptops/electronic-7.jpg",
    href: "#",
  },
  {
    name: "Smartphones",
    image: "/laptops/electronic-5.jpg",
    href: "#",
  },
  {
    name: "Phone Accessories",
    image: "/laptops/electronic-4.jpg",
    href: "#",
  },
  {
    name: "Desktops",
    image: "/laptops/electronic-2.jpg",
    href: "#",
  },
  {
    name: "Smartwatches",
    image: "/laptops/electronic-6.jpg",
    href: "#",
  },
  {
    name: "Audio",
    image: "/laptops/electronic-1.jpg",
    href: "#",
  },
];

export default function CategoryGrid({
  title = "Shop our most wanted",
  categories = defaultCategories,
}: CategoryGridProps) {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-heading-3 text-dark-900 mb-6 md:mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href || "#"}
              className="group block"
            >
              <article className="flex flex-col">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#d4f34d] transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-4 md:p-6"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h3 className="mt-3 text-body-medium text-dark-900 group-hover:underline">
                  {category.name}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
