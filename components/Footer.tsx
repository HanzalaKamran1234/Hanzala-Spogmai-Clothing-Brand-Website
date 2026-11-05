import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-text py-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h4 className="font-heading text-lg mb-3">SPOGMAI</h4>
          <p className="text-sm text-secondary-text">
            Premium luxury fashion for the modern gentleman.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-3">Shop</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/shop" className="hover:text-accent">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-accent">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-accent">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-3">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/shipping" className="hover:text-accent">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-accent">
                Returns & Exchange
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-3">Stay Connected</h4>
          <p className="text-sm text-secondary-text mb-2">Subscribe to our newsletter</p>
          <form
            className="flex space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="you@domain.com"
              required
              className="flex-1 bg-surface text-primary-text px-3 py-2 border border-border rounded"
            />
            <button
              type="submit"
              className="bg-accent text-primary-text px-4 rounded hover:bg-primary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-secondary-text">
        © {new Date().getFullYear()} SPOGMAI. All rights reserved.
      </div>
    </footer>
  );
}
