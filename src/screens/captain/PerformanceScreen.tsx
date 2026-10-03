import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/useAppTheme";
import { useAuthStore } from "../../store/authStore";
import { getCaptainKpi } from "../../api/captainRuntime";

export default function PerformanceScreen() {
  const appTheme = useAppTheme();
  const styles = createStyles(appTheme);
  const user = useAuthStore((s) => s.user);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (background = false, manual = false) => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      if (!background && !manual) {
        setLoading(true);
      }
      if (manual) {
        setRefreshing(true);
      }

      setData(await getCaptainKpi(user.id));
    } catch (e: any) {
      Alert.alert(
        "تعذر تحميل الأداء",
        e?.response?.data?.message ||
          "تعذر تحميل مؤشرات الأداء."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();

    const timer = setInterval(() => {
      void load(true);
    }, 30000);

    return () => clearInterval(timer);
  }, [load]);

  const orders =
    data?.orders ??
    data?.totalOrders ??
    0;

  const completed =
    data?.completed ??
    data?.completedOrders ??
    0;

  const cancelled =
    data?.cancelled ??
    data?.cancelledOrders ??
    0;

  const averageTime =
    data?.averageDeliveryTime ??
    data?.avgDeliveryTime ??
    0;

  const rating =
    data?.averageRating ??
    data?.avgRating ??
    0;

  const duration = data?.workDuration ?? 0;

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void load(false, true)}
            tintColor={appTheme.primaryColor}
            colors={[appTheme.primaryColor]}
          />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons
              name="stats-chart-outline"
              size={24}
              color={appTheme.primaryColor}
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>زاجل ديلفري</Text>
            <Text style={styles.title}>أدائي</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>ملخص الأداء</Text>

          <Text style={styles.heroValue}>
            {completed}
          </Text>

          <Text style={styles.heroText}>
            طلب مكتمل
          </Text>
        </View>

        <View style={styles.grid}>
          <Metric
            icon="cube-outline"
            title="كل الطلبات"
            value={orders}
            appTheme={appTheme}
          />

          <Metric
            icon="checkmark-circle-outline"
            title="المكتملة"
            value={completed}
            appTheme={appTheme}
          />

          <Metric
            icon="close-circle-outline"
            title="الملغاة"
            value={cancelled}
            appTheme={appTheme}
          />

          <Metric
            icon="star-outline"
            title="متوسط التقييم"
            value={rating}
            appTheme={appTheme}
          />
        </View>

        <Section
          title="مؤشرات التوصيل"
          appTheme={appTheme}
        >
          <Row
            icon="time-outline"
            title="متوسط وقت التوصيل"
            value={averageTime}
            appTheme={appTheme}
          />

          <Row
            icon="hourglass-outline"
            title="مدة العمل"
            value={duration}
            appTheme={appTheme}
            last
          />
        </Section>
      </ScrollView>
    </Screen>
  );
}

function Metric({
  icon,
  title,
  value,
  appTheme,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string | number;
  appTheme: ReturnType<typeof useAppTheme>;
}) {
  const styles = createStyles(appTheme);

  return (
    <View style={styles.metric}>
      <View style={styles.metricIcon}>
        <Ionicons
          name={icon}
          size={20}
          color={appTheme.primaryColor}
        />
      </View>

      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );
}

function Section({
  title,
  children,
  appTheme,
}: {
  title: string;
  children: React.ReactNode;
  appTheme: ReturnType<typeof useAppTheme>;
}) {
  const styles = createStyles(appTheme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({
  icon,
  title,
  value,
  appTheme,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string | number;
  appTheme: ReturnType<typeof useAppTheme>;
  last?: boolean;
}) {
  const styles = createStyles(appTheme);

  return (
    <View
      style={[
        styles.row,
        !last && styles.rowBorder,
      ]}
    >
      <View style={styles.rowIcon}>
        <Ionicons
          name={icon}
          size={19}
          color={appTheme.primaryColor}
        />
      </View>

      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const createStyles = (
  appTheme: ReturnType<typeof useAppTheme>
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 2,
      paddingTop: 2,
      paddingBottom: 35,
      gap: 14,
    },

    header: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 12,
    },

    headerIcon: {
      width: 50,
      height: 50,
      borderRadius: 17,
      backgroundColor: appTheme.primaryColor + "14",
      alignItems: "center",
      justifyContent: "center",
    },

    headerText: {
      flex: 1,
      alignItems: "flex-end",
    },

    eyebrow: {
      color: appTheme.primaryColor,
      fontSize: 12,
      fontWeight: "800",
    },

    title: {
      color: appTheme.textColor,
      fontSize: 28,
      fontWeight: "900",
    },

    hero: {
      borderRadius: 24,
      backgroundColor: appTheme.primaryDarkColor,
      padding: 23,
      alignItems: "center",
      minHeight: 155,
      justifyContent: "center",
    },

    heroLabel: {
      color: "#99F6E4",
      fontSize: 13,
      fontWeight: "800",
    },

    heroValue: {
      color: "#FFFFFF",
      fontSize: 43,
      fontWeight: "900",
      marginTop: 4,
    },

    heroText: {
      color: "#CCFBF1",
      fontSize: 12,
      marginTop: 2,
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },

    metric: {
      width: "48%",
      minHeight: 135,
      padding: 15,
      borderRadius: 20,
      backgroundColor: appTheme.cardColor,
      borderWidth: 1,
      borderColor: appTheme.borderColor,
      alignItems: "flex-end",
    },

    metricIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: appTheme.primaryColor + "12",
      alignItems: "center",
      justifyContent: "center",
    },

    metricValue: {
      color: appTheme.textColor,
      fontSize: 27,
      fontWeight: "900",
      marginTop: 13,
    },

    metricTitle: {
      color: appTheme.secondaryTextColor,
      fontSize: 12,
      fontWeight: "700",
      marginTop: 2,
    },

    section: {
      borderRadius: 21,
      backgroundColor: appTheme.cardColor,
      borderWidth: 1,
      borderColor: appTheme.borderColor,
      paddingHorizontal: 17,
      paddingTop: 17,
    },

    sectionTitle: {
      color: appTheme.textColor,
      fontSize: 16,
      fontWeight: "900",
      textAlign: "right",
      marginBottom: 5,
    },

    row: {
      minHeight: 62,
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 10,
    },

    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: appTheme.borderColor,
    },

    rowIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: appTheme.primaryColor + "10",
      alignItems: "center",
      justifyContent: "center",
    },

    rowTitle: {
      flex: 1,
      color: appTheme.secondaryTextColor,
      fontSize: 12,
      fontWeight: "700",
      textAlign: "right",
    },

    rowValue: {
      color: appTheme.textColor,
      fontSize: 14,
      fontWeight: "900",
    },
  });
