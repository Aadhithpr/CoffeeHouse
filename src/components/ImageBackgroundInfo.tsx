import React from 'react';
import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favorites: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavorite: any;
}
const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  favorites,
  name,
  id,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ImageBackgroundImage}>
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavorite(favorites, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favorites ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBarContainerWithOutBack}>
            <TouchableOpacity
              onPress={() => {
                ToggleFavorite(favorites, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favorites ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.ItemTiletext}>{name}</Text>
                <Text style={styles.ItemSubtitleText}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.ItemPropertiesContainer}>
                <View style={styles.PropertyFirst}>
                  <CustomIcon
                    name={type == 'Bean' ? 'bean' : 'beans'}
                    size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_20}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.PropertyTextFirst,
                      {
                        marginTop:
                          type == 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {type}
                  </Text>
                </View>
                <View style={styles.PropertyFirst}>
                  <CustomIcon
                    name={type == 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <CustomIcon
                  name={'star'}
                  size={FONTSIZE.size_20}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithOutBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ImageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ImageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  ItemTiletext: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  PropertyFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  PropertyTextLast: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4 + SPACING.space_2,
  },
});
export default ImageBackgroundInfo;
