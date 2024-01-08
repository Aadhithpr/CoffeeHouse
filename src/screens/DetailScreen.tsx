import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useStore} from '../store/Store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailScreen = ({navigation, route}: any) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler = () => {
    navigation.pop();
  };

  const addTofavoriteList = useStore((state: any) => state.addTofavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavorite = (favorites: boolean, type: string, id: string) => {
    favorites ? deleteFromFavoriteList(type, id) : addTofavoriteList(type, id);
  };

  const addTocart = useStore((state: any) => state.addTocart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const addTOCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addTocart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.DetailsScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favorites={itemOfIndex.favorites}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavorite={ToggleFavorite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
        <Text style={styles.InfoTitle}>Sizes</Text>
        <View style={styles.SizeOuterContainer}>
          {itemOfIndex.prices.map((data: any) => (
            <TouchableOpacity
              key={data.size}
              onPress={() => {
                setPrice(data);
              }}
              style={[
                styles.SizeBox,
                {
                  borderColor:
                    data.size == price.size
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryDarkGreyHex,
                },
              ]}>
              <Text
                style={[
                  styles.SizeText,
                  {
                    fontSize:
                      itemOfIndex.type == 'bean'
                        ? FONTSIZE.size_14
                        : FONTSIZE.size_16,
                    color:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  },
                ]}>
                {data.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <PaymentFooter
          prices={price}
          buttonTitle="Add to cart"
          buttonPressHandler={() => {
            addTOCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_sqaure: itemOfIndex.imagelink_sqaure,
              special_ingredient: itemOfIndex.special_ingredient,
              typed: itemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DetailsScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_2,
    letterSpacing: 0.5,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
export default DetailScreen;
