import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'; // ✅ 引入 Drawer 相關組件
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookCard, { Book } from './BookCard';
import bookData from './data.json';
import DetailsScreen from './DetailsScreen';
import { WishlistProvider } from './WishlistContext';
import WishlistScreen from './WishlistScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // ✅ 定義 Drawer

// --- 漢堡選單自定義內容 ---
function CustomDrawerContent(props: any) {
  // 使用 state 來追蹤當前點擊的項目，達成顏色變化效果
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavigation = (name: string, target?: string) => {
    setActiveItem(name);
    if (target) {
      props.navigation.navigate(target);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#FFF' }}>
      {/* 使用者資訊區塊 */}
      <View style={styles.drawerHeader}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=may' }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>May</Text>
      </View>

      {/* 選單項目 */}
      <DrawerItem
        label="Home"
        focused={activeItem === 'Home'}
        activeTintColor="#6200EE"
        icon={({ color }) => <Ionicons name="home" size={22} color={color} />}
        onPress={() => handleNavigation('Home', 'MainTabs')}
      />
      <DrawerItem
        label="Account"
        focused={activeItem === 'Account'}
        activeTintColor="#6200EE"
        icon={({ color }) => <Ionicons name="person" size={22} color={color} />}
        onPress={() => handleNavigation('Account')}
      />
      <DrawerItem
        label="Setting"
        focused={activeItem === 'Setting'}
        activeTintColor="#6200EE"
        icon={({ color }) => <Ionicons name="settings" size={22} color={color} />}
        onPress={() => handleNavigation('Setting')}
      />
    </DrawerContentScrollView>
  );
}

const MyBooksScreen = () => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>My Books (Coming Soon)</Text></View>
);

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
        {/* ✅ 修改：點擊漢堡圖示開啟選單 */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
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

// 👉 最終導出：使用 DrawerNavigator 包裹 TabNavigator
export default function BookApp() {
  return (
    <WishlistProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="MainTabs" component={BookAppInternal} />
      </Drawer.Navigator>
    </WishlistProvider>
  );
}

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
  // --- 新增 Drawer 樣式 ---
  drawerHeader: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});