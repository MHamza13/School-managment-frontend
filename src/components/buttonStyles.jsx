import { Button } from "@mui/material";

export const RedButton = (props) => (
  <Button
    {...props}
    className="!bg-red-600 !text-white !ml-1 hover:!bg-red-400 hover:!border-red-400 !shadow-none"
  />
);

export const BlackButton = (props) => (
  <Button
    {...props}
    className="!bg-black !text-white !ml-1 hover:!bg-zinc-900 hover:!border-zinc-900 !shadow-none"
  />
);

export const DarkRedButton = (props) => (
  <Button
    {...props}
    className="!bg-[#650909] !text-white hover:!bg-red-400 hover:!border-red-400 !shadow-none"
  />
);

export const BlueButton = (props) => (
  <Button
    {...props}
    className="!bg-[#080a43] !text-white hover:!bg-[#0a1e82]"
  />
);

export const PurpleButton = (props) => (
  <Button
    {...props}
    className="!bg-[#270843] !text-white hover:!bg-[#3f1068]"
  />
);

export const LightPurpleButton = (props) => (
  <Button
    {...props}
    className="!bg-[#7f56da] !text-white hover:!bg-[#7a1ccb]"
  />
);

export const GreenButton = (props) => (
  <Button
    {...props}
    className="!bg-[#133104] !text-white hover:!bg-[#266810]"
  />
);

export const BrownButton = (props) => (
  <Button
    {...props}
    className="!bg-[#2c1006] !text-white hover:!bg-[#40220c] hover:!border-[#40220c] !shadow-none"
  />
);

export const IndigoButton = (props) => (
  <Button
    {...props}
    className="!bg-[#2f2b80] !text-white hover:!bg-[#534ea6] hover:!border-[#473d90] !shadow-none"
  />
);
