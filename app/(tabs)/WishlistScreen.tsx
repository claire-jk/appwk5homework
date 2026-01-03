import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BookCard from './BookCard';
import { useWishlist } from './WishlistContext';

export default function WishlistScreen({ navigation }: any) {
  const { wishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      {wishlist.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: 'grey' }}>Your wishlist is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          numColumns={2} // 讓收藏頁面顯示兩排，比較好讀
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <BookCard 
                item={item} 
                onPress={() => navigation.navigate('Home', { screen: 'Details', params: { book: item } })} 
              />
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 28, fontWeight: 'bold', margin: 20 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 10, paddingBottom: 80 },
  cardWrapper: { flex: 0.5, marginBottom: 20, alignItems: 'center' }
});