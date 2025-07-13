import { FC } from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

interface AlertDialogProps {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const AlertDialog: FC<AlertDialogProps> = ({
  visible,
  title = "Alert",
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title style={{ color: theme.colors.onSurface }}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: theme.colors.onSurface }}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          {onCancel && (
            <Button onPress={onCancel} textColor={theme.colors.secondary}>
              {cancelText}
            </Button>
          )}
          <Button onPress={onConfirm} textColor={theme.colors.error}>
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
