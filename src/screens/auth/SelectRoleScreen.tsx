import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, G, Line, Path, Rect } from "react-native-svg";

import Screen from "../../components/Screen";
import { useAuthStore } from "../../store/authStore";

const ORANGE = "#E5501C";
const ORANGE_DARK = "#B4460A";
const GOLD = "#FFB25E";
const CREAM = "#FFFDF8";
const DARK = "#4A1B0C";

function CaptainMotorcycleIllustration() {
  return (
    <Svg
      width={172}
      height={128}
      viewBox="0 0 172 128"
      fill="none"
      accessibilityLabel="Captain on motorcycle"
    >
      {/* soft shadow under the motorcycle */}
      <Path
        d="M27 108 C47 100 108 100 137 108 C119 117 47 119 27 108Z"
        fill="rgba(74,27,12,0.11)"
      />

      <G>
        {/* rear delivery bag */}
        <Rect
          x="70"
          y="34"
          width="28"
          height="31"
          rx="8"
          fill="#FFF1E4"
          stroke="#E5501C"
          strokeWidth="2.5"
        />
        <Path
          d="M76 34V30C76 26.7 78.7 24 82 24H86C89.3 24 92 26.7 92 30V34"
          stroke="#E5501C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Path
          d="M76 48H92"
          stroke="#FFB25E"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* motorcycle wheels */}
        <Circle cx="43" cy="91" r="16" fill="#26160B" />
        <Circle cx="43" cy="91" r="8" fill="#FFFDF8" />
        <Circle cx="117" cy="91" r="16" fill="#26160B" />
        <Circle cx="117" cy="91" r="8" fill="#FFFDF8" />

        {/* motorcycle body */}
        <Path
          d="M43 91L60 70L84 86L103 84L117 91"
          stroke="#E5501C"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M59 70L77 70L87 79L102 79"
          stroke="#4A1B0C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <Path
          d="M77 70L69 56"
          stroke="#E5501C"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Path
          d="M102 79L111 64L123 62"
          stroke="#4A1B0C"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="111"
          y1="64"
          x2="119"
          y2="73"
          stroke="#4A1B0C"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Path
          d="M47 72L58 68"
          stroke="#FFB25E"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* captain torso */}
        <Path
          d="M89 42C94 42 101 46 104 53L99 70L84 69L82 54C83 47 85 43 89 42Z"
          fill="#E5501C"
        />
        <Path
          d="M86 46L77 56"
          stroke="#E5501C"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Path
          d="M98 50L108 58"
          stroke="#E5501C"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Circle cx="90" cy="35" r="10" fill="#FFD0A6" />

        {/* helmet */}
        <Path
          d="M79 35C79 25 85 18 94 18C102 18 108 24 108 33V37H79V35Z"
          fill="#26160B"
        />
        <Path
          d="M84 29C86 24 90 22 94 22C100 22 104 25 105 30"
          stroke="#FFB25E"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M101 37H111"
          stroke="#26160B"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* captain arm reaching the handle */}
        <Path
          d="M103 53L115 61"
          stroke="#FFD0A6"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* captain leg */}
        <Path
          d="M87 68L76 83L91 89"
          stroke="#26160B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M91 89H99"
          stroke="#26160B"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* small motion accents */}
        <Path
          d="M24 63H34"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.72"
        />
        <Path
          d="M20 71H28"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <Circle cx="134" cy="36" r="4" fill="#FFFFFF" opacity="0.58" />
      </G>
    </Svg>
  );
}

export default function SelectRoleScreen() {
  const navigation = useNavigation<any>();
  const setAccountType = useAuthStore((s) => s.setAccountType);

  // المطعم يدخل من اليمين إلى الداخل
  const shopIn = useRef(new Animated.Value(420)).current;

  // الكابتن يدخل من اليسار إلى الداخل
  const captainIn = useRef(new Animated.Value(-420)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(shopIn, {
        toValue: 0,
        delay: 120,
        damping: 16,
        stiffness: 110,
        mass: 0.8,
        useNativeDriver: true,
      }),
      Animated.spring(captainIn, {
        toValue: 0,
        delay: 220,
        damping: 16,
        stiffness: 110,
        mass: 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      shopIn.stopAnimation();
      captainIn.stopAnimation();
      opacity.stopAnimation();
    };
  }, [shopIn, captainIn, opacity]);

  function choose(type: "shop" | "captain") {
    setAccountType(type);
    navigation.navigate("Login");
  }

  return (
    <Screen>
      <View style={styles.root}>
        <View style={styles.phone}>
          <LinearGradient
            colors={["#FFC24D", "#FF8A3D", "#E85D2A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.blobOne} />
            <View style={styles.blobTwo} />

            <View style={styles.icon3d}>
              <View pointerEvents="none" style={styles.artGlow} />
              <View pointerEvents="none" style={styles.captainArt}>
                <CaptainMotorcycleIllustration />
              </View>
            </View>

            <Text style={styles.welcome}>أهلا بيك</Text>
            <View pointerEvents="none" style={styles.liquidWave}>
              <Svg
                width="100%"
                height="88"
                viewBox="0 0 340 88"
                preserveAspectRatio="none"
              >
                <Path
                  d="M0 34
                     C35 52 60 18 94 28
                     C126 38 141 67 171 51
                     C204 33 220 14 251 25
                     C283 37 307 58 340 38
                     L340 88
                     L0 88 Z"
                  fill="#FFFDF8"
                />

                <Path
                  d="M0 30
                     C35 48 60 14 94 24
                     C126 34 141 63 171 47
                     C204 29 220 10 251 21
                     C283 33 307 54 340 34
                     L340 45
                     C307 65 283 44 251 32
                     C220 21 204 39 171 57
                     C141 73 126 44 94 34
                     C60 24 35 58 0 40 Z"
                  fill="rgba(255,255,255,0.22)"
                />

                <Path
                  d="M92 31
                     C98 37 101 43 101 50
                     C101 57 97 61 92 61
                     C87 61 83 57 83 51
                     C83 44 87 37 92 31 Z"
                  fill="#FFFDF8"
                />

                <Path
                  d="M250 29
                     C256 35 259 42 259 50
                     C259 58 255 63 249 63
                     C243 63 239 58 239 51
                     C239 43 244 35 250 29 Z"
                  fill="#FFFDF8"
                />
              </Svg>
            </View>


            <View style={styles.brandLine}>
              <Text style={styles.brand}>زاجل</Text>
              <Text style={styles.brandEnglish}> ZAJEL DELIVERY</Text>
            </View>

            <View style={styles.waveOne} />
            <View style={styles.waveTwo} />
            <View style={styles.waveAccent} />
            <View style={styles.waveGlow} />
          </LinearGradient>

          <Animated.View
            style={[
              styles.bodyContent,
              {
                opacity,
                transform: [{ translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }) }],
              },
            ]}
          >
            <Text style={styles.sub}>
              اختار نوع الحساب عشان تكمل تسجيل الدخول
            </Text>

            <Animated.View
              style={{
                width: "100%",
                transform: [{ translateX: shopIn }],
              }}
            >
              <Pressable
                onPress={() => choose("shop")}
                style={({ pressed }) => [
                  styles.btn,
                  styles.btnRestaurant,
                  pressed && styles.btnPressed,
                ]}
              >
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={25}
                  color="#FFFFFF"
                />
                <Text style={styles.restaurantText}>
                  تسجيل دخول مطعم
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={{
                width: "100%",
                transform: [{ translateX: captainIn }],
              }}
            >
              <Pressable
                onPress={() => choose("captain")}
                style={({ pressed }) => [
                  styles.btn,
                  styles.btnCaptain,
                  pressed && styles.btnPressed,
                ]}
              >
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  size={25}
                  color="#FFD9A0"
                />
                <Text style={styles.captainText}>
                  تسجيل دخول كابتن
                </Text>
              </Pressable>
            </Animated.View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>او</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={({ pressed }) => [
                pressed && { opacity: 0.65 },
              ]}
            >
              <Text style={styles.footerLink}>
                مفيش حساب؟ سجل واحد جديد
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFE7D1",
    alignItems: "center",
    justifyContent: "center",
  },

  phone: {
    width: "100%",
    maxWidth: 430,
    minHeight: "100%",
    backgroundColor: CREAM,
    overflow: "hidden",
  },

  hero: {
    height: 315,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: 24,
  },

  blobOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 100,
    top: -72,
    left: -52,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  blobTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 100,
    bottom: -50,
    right: -34,
    backgroundColor: "rgba(255,255,255,0.13)",
  },

  icon3d: {
    width: 174,
    height: 132,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A03C00",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 11,
    zIndex: 5,
    overflow: "visible",
  },

  artGlow: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#FFF4E9",
    top: 10,
    right: 30,
  },

  captainArt: {
    position: "absolute",
    left: 1,
    top: -3,
    width: 172,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    textShadowColor: "rgba(150,50,0,0.35)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 5,
    zIndex: 5,
  },

  brandLine: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 7,
    zIndex: 5,
  },

  brand: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  brandEnglish: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  waveOne: {
    position: "absolute",
    width: "150%",
    height: 105,
    bottom: -62,
    left: "-25%",
    borderRadius: 90,
    backgroundColor: CREAM,
    transform: [{ rotate: "-4deg" }],
    shadowColor: "#C95A25",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },

  waveTwo: {
    position: "absolute",
    width: "125%",
    height: 78,
    bottom: -40,
    left: "-18%",
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.58)",
    transform: [{ rotate: "5deg" }],
  },

  waveAccent: {
    position: "absolute",
    width: "105%",
    height: 72,
    bottom: -30,
    right: "-20%",
    borderRadius: 70,
    backgroundColor: "rgba(255,138,61,0.68)",
    transform: [{ rotate: "-7deg" }],
  },

  waveGlow: {
    position: "absolute",
    width: "82%",
    height: 38,
    bottom: 10,
    right: "-10%",
    borderRadius: 50,
    backgroundColor: "rgba(255,190,120,0.38)",
    transform: [{ rotate: "-5deg" }],
  },

  liquidWave: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -25,
    height: 75,
    zIndex: 1,
    overflow: "hidden",
  },

  bodyContent: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 26,
    alignItems: "center",
  },

  sub: {
    color: "#8A5A2E",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 21,
  },

  btn: {
    width: "100%",
    minHeight: 60,
    borderRadius: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },

  btnRestaurant: {
    backgroundColor: GOLD,
    shadowColor: "#E6781E",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },

  btnCaptain: {
    backgroundColor: DARK,
    shadowColor: "#3C1400",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 5,
  },

  btnPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },

  restaurantText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  captainText: {
    color: "#FFD9A0",
    fontSize: 16,
    fontWeight: "800",
  },

  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    marginBottom: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#F0D9BE",
  },

  dividerText: {
    color: "#C9A177",
    fontSize: 12,
    fontWeight: "700",
  },

  footerLink: {
    color: ORANGE_DARK,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});
