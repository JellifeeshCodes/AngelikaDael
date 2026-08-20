import React, { type ReactElement, type ReactNode, type ComponentType } from "react";
import { Modal, TitleBar, useModal } from "@react95/core";
import { useWindowsStore } from "../store/windows";

const styles = {
  desktopIcon: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    width: "100px",
    gap: "10px",
  },
  iconName: {
    color: "#ffffff",
    fontSize: "14px",
    margin: "0",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
    userSelect: "none",
  },
} as const;

interface WindowProps {
  icon: ReactElement<{ variant?: string }>;
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
  onClose: () => void;
}

const Window = ({ title, onClose, children, icon, width, height }: WindowProps) => {
  const { minimize } = useModal();
  return (
    <SafeModal
      id={title}
      icon={icon}
      title={title}
      titleBarOptions={[
        <TitleBar.Minimize
          style={{ marginBlock: "auto" }}
          key="maximize"
          onClick={() => minimize(title)}
        />,
        <TitleBar.Close
          style={{ marginBlock: "auto" }}
          key="close"
          onClick={onClose}
        />,
      ]}
    >
      <Modal.Content width={`${width}px`} height={`${height}px`}>
        {children}
      </Modal.Content>
    </SafeModal>
  );
};

interface DesktopIconProps {
  icon: ReactElement<{ variant?: string }>;
  name: string;
  children: ReactNode;
  width?: number;
  height?: number;
}

const DesktopIcon = ({
  icon,
  name,
  children,
  width,
  height,
}: DesktopIconProps) => {
  const { openWindow, closeWindow, isWindowOpen } = useWindowsStore();
  const isOpen = isWindowOpen(name);

  const handleDoubleClick = () => {
    openWindow(name);
  };

  const handleCloseWindow = () => {
    closeWindow(name);
  };

  // Safely check if the icon is a standard HTML tag (like <img>) vs a React95 icon component
  const renderIcon = (variantSize: string) => {
    if (typeof icon.type === "string") {
      return icon;
    }
    return React.cloneElement(icon, { variant: variantSize });
  };

  return (
    <>
      <div style={styles.desktopIcon} onDoubleClick={handleDoubleClick}>
        {renderIcon("32x32_4")}
        <p style={styles.iconName}>{name}</p>
      </div>
      {isOpen && (
        <Window
          width={width}
          height={height}
          icon={renderIcon("16x16_4")}
          title={name}
          onClose={handleCloseWindow}
        >
          {children}
        </Window>
      )}
    </>
  );
};

export default DesktopIcon;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SafeModal = Modal as unknown as ComponentType<any>;
