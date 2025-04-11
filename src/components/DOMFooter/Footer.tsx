import { TonConnectButton} from "@tonconnect/ui-react";

export const Footer = () => {

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%", paddingBottom: "40px" }}>

      <div style={{ margin: "auto" }}>
        <TonConnectButton />
      </div>
    </div>
  );
};
