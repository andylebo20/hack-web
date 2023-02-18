import React from "react";

import { TailSpin } from "react-loader-spinner";
import { Colors } from "../colors";

type Props = {
  size?: number;
  color?: string;
};

export const LoadingSpinner = ({ size, color }: Props) => (
  <TailSpin
    height={size || 40}
    width={size || 40}
    color={Colors.darkGray}
    ariaLabel="loading"
  />
);
