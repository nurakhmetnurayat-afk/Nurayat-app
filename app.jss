import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ==========================================
// 1. КІРУ БЕТІ (LOGIN)
// ==========================================
function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    if (!phone.trim()) return;
    navigation.navigate('OTPVerification', { phone });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Привет, с возвращением!</Text>
        <Text style={styles.subtitle}>Введите номер телефона для входа</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIconText}>📞</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+7 (___) ___-__-__"
            placeholderTextColor="#AAA9B2"
            keyboardType="phone-pad"
          />
        </View>

        <Pressable style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>Получить код</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 2. [НОВОЕ ОКОШКО] СМС КОД (OTP)
// ==========================================
function OTPVerificationScreen({ route, navigation }) {
  const { phone } = route.params || {};
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      // простой переход фокуса
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Введите 4-значный код</Text>
        <Text style={styles.subtitle}>Отправили СМС на {phone || 'ваш номер'}</Text>

        <View style={styles.otpRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(val) => handleChange(val, idx)}
            />
          ))}
        </View>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        >
          <Text style={styles.primaryBtnText}>Подтвердить</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 3. БАСТЫ БЕТ (HOME)
// ==========================================
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView style={styles.home} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>Добро пожаловать 👋</Text>
            <Text style={styles.homeTitle}>Мой кабинет</Text>
          </View>

          <Pressable style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileText}>👤</Text>
          </Pressable>
        </View>

        {/* Search */}
        <Pressable style={styles.searchBox} onPress={() => navigation.navigate('Explore')}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={{ color: '#AAA9B2', fontSize: 16 }}>Поиск предметов и уроков...</Text>
        </Pressable>

        {/* Subjects */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Мои предметы</Text>
          <Pressable onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.linkText}>Все</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('Subject', { subject: 'Информатика', icon: '💻', tasks: '5 заданий' })
          }
        >
          <View style={styles.cardIcon}>
            <Text style={{ fontSize: 24 }}>💻</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Информатика</Text>
            <Text style={styles.cardSubtitle}>5 заданий</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('Subject', { subject: 'Математика', icon: '📐', tasks: '3 задания' })
          }
        >
          <View style={styles.cardIcon}>
            <Text style={{ fontSize: 24 }}>📐</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Математика</Text>
            <Text style={styles.cardSubtitle}>3 задания</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </Pressable>

        {/* Active Task */}
        <Text style={styles.sectionTitle}>Текущий проект</Text>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Создать мобильное приложение</Text>
          <Text style={styles.taskText}>Срок сдачи: завтра, 18:00</Text>
          <Pressable
            style={styles.taskButton}
            onPress={() =>
              navigation.navigate('TaskDetails', {
                title: 'Создать мобильное приложение',
                desc: 'Разработать пользовательский интерфейс в React Native по макету.',
              })
            }
          >
            <Text style={styles.taskButtonText}>Открыть задание</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 4. [НОВОЕ ОКОШКО] КАТАЛОГ / ПОИСК (EXPLORE)
// ==========================================
function ExploreScreen({ navigation }) {
  const categories = [
    { id: '1', title: 'Программирование', count: '12 курсов', icon: '⚡' },
    { id: '2', title: 'Дизайн & UX', count: '8 курсов', icon: '🎨' },
    { id: '3', title: 'Математика', count: '15 курсов', icon: '📊' },
    { id: '4', title: 'Языки', count: '10 курсов', icon: '🌐' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 10 }}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Каталог знаний</Text>

        <View style={[styles.searchBox, { marginTop: 15 }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={{ flex: 1 }} placeholder="Название предмета..." placeholderTextColor="#AAA9B2" />
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.gridCard}
              onPress={() =>
                navigation.navigate('Subject', {
                  subject: item.title,
                  icon: item.icon,
                  tasks: item.count,
                })
              }
            >
              <Text style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.count}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 5. ПӘННІҢ ЖЕКЕ БЕТІ (SUBJECT)
// ==========================================
function SubjectScreen({ route, navigation }) {
  const { subject, icon, tasks } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView style={styles.home}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <View style={styles.bigIconBox}>
          <Text style={{ fontSize: 38 }}>{icon}</Text>
        </View>

        <Text style={styles.title}>{subject}</Text>
        <Text style={styles.subtitle}>{tasks}</Text>

        <Text style={styles.sectionTitle}>Список модулей</Text>

        {[1, 2, 3].map((num) => (
          <Pressable
            key={num}
            style={styles.lessonCard}
            onPress={() =>
              navigation.navigate('TaskDetails', {
                title: `Урок ${num}: Практика`,
                desc: `Подробное описание и требования к выполнению работы №${num}.`,
              })
            }
          >
            <View style={styles.lessonNum}>
              <Text style={{ fontWeight: '700', color: '#6C5CE7' }}>{num}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Задание #{num}</Text>
              <Text style={styles.cardSubtitle}>Нажмите для просмотра деталей</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 6. [НОВОЕ ОКОШКО] ДЕТАЛИ ЗАДАНИЯ (TASK DETAILS)
// ==========================================
function TaskDetailsScreen({ route, navigation }) {
  const { title, desc } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 10 }}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <Text style={styles.title}>{title || 'Детали задания'}</Text>
        <Text style={[styles.subtitle, { marginTop: 10 }]}>{desc}</Text>

        <View style={styles.infoBox}>
          <Text style={{ fontWeight: '600', marginBottom: 5 }}>📎 Вложенные материалы:</Text>
          <Text style={{ color: '#6C5CE7' }}>• Инструкция_v1.pdf</Text>
          <Text style={{ color: '#6C5CE7' }}>• Макет_проекта.fig</Text>
        </View>

        <View style={{ flex: 1 }} />

        <Pressable style={styles.primaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryBtnText}>Сдать работу</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 7. [НОВОЕ ОКОШКО] ПРОФИЛЬ (PROFILE)
// ==========================================
function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 10 }}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <View style={styles.avatarLarge}>
            <Text style={{ fontSize: 40 }}>👤</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '700', marginTop: 10 }}>Алексей Смирнов</Text>
          <Text style={{ color: '#AAA9B2' }}>Студент • Группа ИТ-2024</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={{ fontSize: 16 }}>⚙️ Настройки аккаунта</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={{ fontSize: 16 }}>🔔 Уведомления</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={{ fontSize: 16 }}>📊 Мой прогресс</Text>
        </View>

        <Pressable
          style={[styles.primaryBtn, { backgroundColor: '#FF5A5F', marginTop: 30 }]}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        >
          <Text style={styles.primaryBtnText}>Выйти</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// NAVIGATOR
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Subject" component={SubjectScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// СТИЛИ (STYLES)
// ==========================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 26, paddingTop: 20 },
  home: { flex: 1, paddingHorizontal: 22 },

  title: { fontSize: 26, fontWeight: '700', color: '#1B1923' },
  subtitle: { fontSize: 15, color: '#AAA9B2', marginTop: 6, marginBottom: 20 },

  backBtn: { width: 40, height: 40, justifyContent: 'center', marginBottom: 15 },
  backBtnText: { fontSize: 28, color: '#1B1923' },

  inputContainer: {
    height: 56,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputIconText: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#1B1923' },

  primaryBtn: {
    height: 56,
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#F8F8FA',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1923',
  },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 18 },
  smallText: { color: '#AAA9B2', fontSize: 14 },
  homeTitle: { fontSize: 26, fontWeight: '700', color: '#1B1923' },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0EEFF', justifyContent: 'center', alignItems: 'center' },
  profileText: { fontSize: 20 },

  searchBox: {
    height: 52,
    backgroundColor: '#F8F8FA',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1B1923', marginBottom: 12 },
  linkText: { color: '#6C5CE7', fontWeight: '600' },

  card: {
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#EDEAFF', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1B1923' },
  cardSubtitle: { fontSize: 13, color: '#AAA9B2', marginTop: 2 },
  arrow: { fontSize: 20, color: '#6C5CE7' },

  gridCard: {
    width: '48%',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  taskCard: { backgroundColor: '#6C5CE7', borderRadius: 20, padding: 18, marginBottom: 30 },
  taskTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  taskText: { color: '#E8E5FF', fontSize: 13, marginTop: 4, marginBottom: 16 },
  taskButton: { backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  taskButtonText: { color: '#6C5CE7', fontSize: 14, fontWeight: '700' },

  bigIconBox: { width: 70, height: 70, borderRadius: 20, backgroundColor: '#EDEAFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  lessonCard: { backgroundColor: '#F8F8FA', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  lessonNum: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EDEAFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },

  infoBox: { backgroundColor: '#F8F8FA', padding: 16, borderRadius: 16, marginTop: 15 },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EDEAFF', justifyContent: 'center', alignItems: 'center' },
  menuItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F3' },
});
