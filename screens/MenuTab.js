import * as React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PopUp from "../components/PopUp";
import Menu from "../components/Menu";
import { TabbedHeaderList } from "react-native-sticky-parallax-header";
import Colors from "../constants/Colors";
import screenStyles from "../constants/screenStyles";
import { useNavigation } from "@react-navigation/native";

const FirstRoute = ({ item, handlePresentModalPress}) => {
  const navigation = useNavigation();
  const handleItemSelect = (selectedItem) => {
    navigation.navigate("Order", {
      restaurant: item,
      selectedItem,
    });
  };

  const hasItems = item.suggestions.some(
    (suggestion) => suggestion.items.length > 0
  );

  return (
    <View className="flex">
      <Text className="text-lg font-semibold ml-6">Đề xuất</Text>
      <ScrollView>
        {!hasItems ? (
          <View style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 15 }}>
            <Text></Text>
            <Text className="font-bold text-2xl mb-4">{`Thông tin đặt chỗ nhà hàng ${item.name}`}</Text>
            <Text className="mt-2" style={styles.header}>
              I. Đặt chỗ PasGo : Tư vấn - Giữ chỗ
            </Text>
            {/* <Button title="Open Modal" onPress={handlePresentModalPress} /> */}
            <View style={styles.contentContainer}>
              <Text className="mt-4 text-lg">
                - Quý khách vui lòng đặt chỗ trước ít nhất{" "}
                <Text className="font-bold">60 phút</Text> để được phục vụ tốt
                nhất.
              </Text>
              <Text className="mt-4 text-lg">
                - Bàn đặt của Quý khách được giữ tối đa{" "}
                <Text className="font-bold">15 phút</Text>
              </Text>
            </View>

            <Text className="mt-4" style={styles.header}>
              II. Ưu đãi tặng kèm: Chương trình ưu đãi đang được xây dựng
            </Text>

            <Text className="mt-2" style={styles.header}>
              III. Lưu ý
            </Text>
            <View style={styles.contentContainer}>
              <Text className="mt-4 text-lg">
                - Giá menu chưa bao gồm VAT. Nhà hàng luôn thu VAT theo Quy định
                hiện hành
              </Text>
              <Text className="mt-4 text-lg">
                - Giá menu chưa bao gồm VAT. Nhà hàng luôn thu VAT theo Quy định
                hiện hành
              </Text>
            </View>
          </View>
        ) : (
          item.suggestions.map(
            (suggestion, index) =>
              suggestion.items.length > 0 && (
                <Menu
                  key={index}
                  items={suggestion.items}
                  title={suggestion.title}
                  onItemSelect={handleItemSelect}
                />
              )
          )
        )}

        {/* divider */}
        <View className="bg-[#E0E0E0] w-full h-3"></View>
      </ScrollView>
    </View>
  );
};

const SecondRoute = ({ item }) => (
  <ScrollView>
    <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 15 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {item.imagePrice.map((menuImage, index) => (
          <View key={index} style={{ width: "50%", padding: 5 }}>
            <Image
              source={{ uri: menuImage.image }}
              style={{ width: "100%", height: 120, marginBottom: 10 }}
            />
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
);
const ThirdRoute = ({ item }) => (
  <ScrollView>
    <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 15 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {item.album.map((menuImage, index) => (
          <View key={index} style={{ width: "50%", padding: 5 }}>
            <Image
              source={{ uri: menuImage.image }}
              style={{ width: "100%", height: 120, marginBottom: 10 }}
            />
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
);
const FourRoute = ({ item }) => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
    <Text>{item.description}</Text>
  </View>
);

const renderScene = (props) => {
  const { route, jumpTo } = props;
  switch (route.key) {
    case "first":
      return <FirstRoute {...props} />;
    case "second":
      return <SecondRoute {...props} />;
    case "third":
      return <ThirdRoute {...props} />;
    case "four":
      return <FourRoute {...props} />;
    default:
      return null;
  }
};
const TAB_MARGIN = 24;

const MenuTab = ({ item }) => {
  console.log(item, "menutab");

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Ưu đãi" },
    { key: "second", title: "Bảng giá" },
    { key: "third", title: "Ảnh" },
    { key: "four", title: "Thông tin" },
  ]);

  const sections = routes.map((route) => ({
    title: route.title,
    key: route.key,
    data: [item],
  }));

  return (
    <TabbedHeaderList
      backgroundColor={Colors.white}
      titleStyle={screenStyles.text}
      parallaxHeight={0}
      foregroundImage={{
        uri: item.image,
      }}
      tabs={routes.map(({ title }) => ({ title }))}
      tabTextStyle={screenStyles.text}
      sections={sections}
      tabTextContainerActiveStyle={{
        backgroundColor: Colors.activeOrange,
      }}
      tabTextActiveStyle={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}
      renderItem={({ item, section }) => renderScene({ route: section, item })}
      showsVerticalScrollIndicator={false}
      headerHeight={0}
      stickyTabs
      tabsContainerHorizontalPadding={1}
      // renderSectionHeader={({ section }) => (
      //   <View style={{ backgroundColor: Colors.coralPink, padding: 15 }}>
      //     <Text style={screenStyles.text}>{section.title}</Text>
      //   </View>
      // )}
    />
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  header: {
    // marginTop : 20,
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 8,
  },
  contentContainer: {
    marginLeft: 5,
  },
});
