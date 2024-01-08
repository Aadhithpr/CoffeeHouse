import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {useStore} from '../store/Store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
  {
    name: 'wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route}: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryFromCart = useStore(
    (state: any) => state.addToOrderHistoryFromCart,
  );
  const [paymentMode, setPaymentMode] = useState('Credit card');
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyView} />
        </View>
        <View style={styles.PaymentOptionContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.CreditCardTitle}>Credit Cards</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.LinearGradientStyle}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3862</Text>
                    <Text style={styles.CreditCardNumber}>4321</Text>
                    <Text style={styles.CreditCardNumber}>6578</Text>
                    <Text style={styles.CreditCardNumber}>1111</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Robert Irwin
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        prices={{price: route.params.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
    padding: SPACING.space_10,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_4,
  },
  CreditCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CreditCardNameSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
  LottieAnimation: {
    flex: 1,
  },
});
export default PaymentScreen;
