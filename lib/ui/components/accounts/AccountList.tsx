import { Account } from "@/db/schema";
import { FC } from "react";
import { SectionList } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

interface AccountListProps {
  groupedAccountSections: {
    title: string;
    data: Account[];
  }[];
  editButtonPressHandler: (account: Account) => () => void;
  deleteButtonPressHandler: (account: Account) => () => void;
}

export const AccountList: FC<AccountListProps> = ({
  groupedAccountSections,
  editButtonPressHandler,
  deleteButtonPressHandler,
}) => {
  const theme = useTheme();
  return (
    <SectionList
      sections={groupedAccountSections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: 80,
        paddingHorizontal: 16,
      }}
      style={{
        marginHorizontal: -8,
      }}
      renderItem={({ item }) => (
        <Card style={{ marginVertical: 8 }}>
          <Card.Title
            title={item.name}
            subtitle={`Balance: ${item.balance} ${item.currencyCode}`}
          />
          <Card.Actions>
            <IconButton icon="pencil" onPress={editButtonPressHandler(item)} />
            <IconButton
              icon="trash-can"
              onPress={deleteButtonPressHandler(item)}
            />
          </Card.Actions>
        </Card>
      )}
      renderSectionHeader={({ section }) => (
        <Text
          variant="titleMedium"
          style={{
            marginTop: 16,
            marginBottom: 8,
            color: theme.colors.onBackground,
          }}
        >
          {section.title}
        </Text>
      )}
    />
  );
};
