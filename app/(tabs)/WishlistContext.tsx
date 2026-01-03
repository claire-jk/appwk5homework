import React, { createContext, useContext, useState } from 'react';
import { Book } from './BookCard';

interface WishlistContextType {
  wishlist: Book[];
  toggleWishlist: (book: Book) => void;
  isInWishlist: (bookId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  const toggleWishlist = (book: Book) => {
    setWishlist((prev) =>
      prev.find((item) => item.id === book.id)
        ? prev.filter((item) => item.id !== book.id)
        : [...prev, book]
    );
  };

  const isInWishlist = (bookId: string) => wishlist.some((item) => item.id === bookId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};