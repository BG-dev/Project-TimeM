import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAlert, setVisible } from "../redux/features/alertSlice";

type AlertType = "success" | "info" | "warning" | "error" | undefined;

export const useAlert = () => {
  const dispatch = useAppDispatch();
  const { text, type, visible } = useAppSelector((state) => state.alert);

  const setVisibleState = (isVisible: boolean) => {
    dispatch(setVisible(isVisible));
  };

  const setAlertState = (alertText: string, alertType: AlertType) => {
    dispatch(setAlert({ text: alertText, type: alertType }));
    setTimeout(() => {
      setVisibleState(false);
    }, 4000);
  };

  return { text, type, setAlertState, visible };
};
