import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 這裡我們保留 export interface，因為主頁面還是需要用到這個型別定義
export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  rating?: number;
  description?: string; // 新增描述
  price?: string;       // 新增價格
}

interface BookCardProps {
  item: Book;
  showRating?: boolean;
  onPress?: () => void;
}

// 移除 const 前面的 export
const BookCard: React.FC<BookCardProps> = ({ item, showRating, onPress }) => {
  return (
    // 使用 TouchableOpacity 讓整張卡片可點擊
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
      {showRating && (
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons key={star} name="star" size={14} color={star <= (item.rating || 0) ? "#FFD700" : "#E0E0E0"} />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    marginRight: 20,
  },
  bookImage: {
    width: 150,
    height: 220,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bookAuthor: {
    fontSize: 14,
    color: 'grey',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

// 在最後一行使用 export default 輸出
export default BookCard;