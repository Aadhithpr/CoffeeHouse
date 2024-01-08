import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {useStore} from '../store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({navigation}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addTofavoriteList = useStore((state: any) => state.addTofavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavorite = (favorites: boolean, type: string, id: string) => {
    favorites ? deleteFromFavoriteList(type, id) : addTofavoriteList(type, id);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favorites'} />
            ) : (
              <View style={styles.ListitemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favorites={data.favorites}
                      ToggleFavoriteItem={ToggleFavorite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
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
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListitemContainer: {
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
export default FavoritesScreen;
