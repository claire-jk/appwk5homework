import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWishlist } from './WishlistContext';

export default function DetailsScreen({ route, navigation }: any) {
  const { book } = route.params;
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(book.id);
  //const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 頂部導覽列 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleWishlist(book)}>
          <Ionicons 
            name={isFavorite ? "bookmark" : "bookmark-outline"} 
            size={26} 
            color={isFavorite ? "#6200EE" : "black"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: book.imageUrl }} style={styles.coverImage} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        
        <View style={styles.ratingRow}>
           <Text style={styles.ratingText}>⭐ {book.rating || "4.5"} / 5.0</Text>
        </View>

        <Text style={styles.description}>
          {book.description || "A spectacular visual journey through the fashion world..."}
        </Text>

        {/* 3. 購買按鈕：點擊變色並連至外部 */}
        <TouchableOpacity 
          style={styles.buyButton} 
          activeOpacity={0.8}
          onPress={() => Linking.openURL('https://www.amazon.com')}
        >
          <Text style={styles.buyButtonText}>BUY NOW FOR {book.price || "$46.99"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  content: { alignItems: 'center', paddingHorizontal: 30 },
  coverImage: { width: 200, height: 300, borderRadius: 10, marginBottom: 20, elevation: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  author: { fontSize: 16, color: 'grey', marginVertical: 5 },
  ratingRow: { marginVertical: 10 },
  ratingText: { fontWeight: '600' },
  description: { textAlign: 'center', color: '#666', lineHeight: 22, marginTop: 10 },
  buyButton: { backgroundColor: '#6200EE', width: '100%', padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' },
  buyButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});