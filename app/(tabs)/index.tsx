import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookCard, { Book } from './BookCard';
import bookData from './data.json';
import DetailsScreen from './DetailsScreen';
import { WishlistProvider } from './WishlistContext';
import WishlistScreen from './WishlistScreen'; // ✅ 保留外部引入

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyBooksScreen = () => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text>My Books (Coming Soon)</Text>
  </View>
);

// 負責 Home 和 Details 之間的切換
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity><Ionicons name="menu-outline" size={28} color="black" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="search-outline" size={24} color="black" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Popular Books</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bookData.popularBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookCard 
              item={item as Book} 
              onPress={() => navigation.navigate('Details', { book: item })} 
            />
          )}
          contentContainerStyle={styles.listPadding}
        />
        
        <Text style={styles.sectionTitle}>Newest</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bookData.newestBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookCard 
              item={item as Book} 
              showRating 
              onPress={() => navigation.navigate('Details', { book: item })} 
            />
          )}
          contentContainerStyle={styles.listPadding}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// 這是原本的 BookApp，我們現在將它作為內層組件
function BookAppInternal() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6200EE', 
        tabBarInactiveTintColor: 'grey',  
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Wishlist') iconName = focused ? 'bookmark' : 'bookmark-outline';
          else if (route.name === 'My books') iconName = focused ? 'library' : 'library-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="My books" component={MyBooksScreen} />
    </Tab.Navigator>
  );
}

// 👉 修改最後的導出部分，加上 WishlistProvider
export default function BookApp() {
  return (
    <WishlistProvider>
        <BookAppInternal />
    </WishlistProvider>
  );
}

/* ---------- styles ---------- (全部保留) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  listPadding: { paddingLeft: 20 },
  bottomTab: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingVertical: 10,
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
  },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 12, marginTop: 4, color: 'grey' },
});